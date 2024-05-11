import uuid
import strawberry
import hashlib
from . import couchbase as cb, env

@strawberry.type
class Product:
    id: str
    name: str

@strawberry.type
class Contract:
    id: str
    firstName: str
    lastName: str
    email: str
    signed: bool
    checkSum: str

def create_product(name: str) -> Product:
    id = str(uuid.uuid1())
    cb.insert(env.get_couchbase_conf(),
              cb.DocSpec(bucket=env.get_couchbase_bucket(),
                         collection='products',
                         key=id,
                         data={'name': name}))
    return Product(id=id, name=name)

def create_contract(firstName: str, lastName: str, email:str) -> Contract:
    id = str(uuid.uuid1())
    cb.insert(env.get_couchbase_conf(),
              cb.DocSpec(bucket=env.get_couchbase_bucket(),
                         collection='contracts',
                         key=id,
                         data={'firstName': firstName, 'lastName': lastName, 'email': email, 'signed': False}))
    return Contract(id=id, firstName=firstName, lastName=lastName, email=email, signed=False, checkSum='')

def sign_contract(id: str) -> Contract | None:
    contract = cb.get(env.get_couchbase_conf(),
                     cb.DocRef(bucket=env.get_couchbase_bucket(),
                               collection='contracts',
                               key=id)).content_as[dict]
    document = contract['firstName'] + contract['lastName'] + contract['email']
    checkSum = hashlib.md5(document.encode('utf-8')).hexdigest()
    print("Data: {}".format(contract)) 
    if contract :
        cb.upsert(env.get_couchbase_conf(),
                cb.DocSpec(bucket=env.get_couchbase_bucket(),
                            collection='contracts',
                            key=id,
                            data={'firstName': contract['firstName'], 'lastName': contract['lastName'], 'email': contract['email'], 'signed': True, 'checkSum': checkSum}))
        return Contract(id=id, firstName=contract['firstName'], lastName=contract['lastName'], email=contract['email'], signed=True, checkSum=checkSum)
#
def get_product(id: str) -> Product | None:
    if doc := cb.get(env.get_couchbase_conf(),
                     cb.DocRef(bucket=env.get_couchbase_bucket(),
                               collection='products',
                               key=id)):
        return Product(id=id, name=doc['name'])

def delete_product(id: str) -> None:
    cb.remove(env.get_couchbase_conf(),
              cb.DocRef(bucket=env.get_couchbase_bucket(),
                        collection='products',
                        key=id))

def list_products() -> list[Product]:
    result = cb.exec(
        env.get_couchbase_conf(),
        f"SELECT name, META().id FROM {env.get_couchbase_bucket()}._default.products"
    )
    return [Product(**r) for r in result]
