import pytest
import requests
base_url = "https://restful-booker.herokuapp.com/booking"
auth_url = "https://restful-booker.herokuapp.com/auth"

@pytest.fixture(scope='module')
def auth_token():
    authdata = {
        "username": "admin",
        "password": "password123"
    }
    responce = requests.post(auth_url,json = authdata)
    token = responce.json()["token"]
    yield token
    #assert responce.status_code == 200

@pytest.fixture(scope='module')
def booking_id():
    payload = {
        "firstname": "Kate",
        "lastname": "Second",
        "totalprice": 111,
        "depositpaid": True,
        "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-07"
        }
    }
    result = requests.post(base_url, json=payload)
    yield result.json()['bookingid']
    #assert result.status_code == 200


def test_api_get_code():
   result = requests.get(base_url)
   print(result)
   assert result.status_code == 200 
   
# def test_api_get_book_byID():
#     result = requests.get(f'{base_url}/416')
#     responce_data = result.json()
#     print(responce_data)
#     exp_keys = [
#     "firstname",
#     "lastname",
#     "totalprice",
#     "depositpaid",
#     "bookingdates",
#     "additionalneeds"
#     ]
#     assert len(exp_keys) == len(responce_data.keys())
#     for key in exp_keys:
#         assert key in responce_data.keys()
    #assert result.status_code == 200 

def test_api_get_book_byID():

    payload = {
    "firstname" : "Kate",
    "lastname" : "Second",
    "totalprice" : 111,
    "depositpaid" : True,
    "bookingdates" : {
        "checkin" : "2024-01-01",
        "checkout" : "2024-01-07"
        }
    }
    result = requests.post(base_url, json=payload)
    print(result.json()['bookingid'])
    assert result.status_code == 200

def test_api_check_book_byID():
    result = requests.get(f'{base_url}/1856')
    responce_data = result.json()
    print(responce_data)

    assert result.json()['totalprice'] == 111

def test_api_update_book_byID(auth_token, booking_id):

    payload = {
        "firstname": "Kate",
        "lastname": "Second",
        "totalprice": 511,
        "depositpaid": False,
        "bookingdates": {
            "checkin": "2024-01-01",
            "checkout": "2024-01-07"
        }
    }
    token = {"Cookie": f"token = {auth_token}"}
    responce_1 = requests.get(f"{base_url}/{booking_id}")
    print(responce_1.json())
    result = requests.put(f"{base_url}/{booking_id}",json = payload, headers=token)
    assert result.json()["totalprice"] == 511
    print(result.json())
    responce_2 = requests.get(f"{base_url}/{booking_id}")
    print(responce_2.json())
    assert responce_2.json()["depositpaid"] == False


