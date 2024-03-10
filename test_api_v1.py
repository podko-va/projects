import pytest
import requests
base_url = "https://restful-booker.herokuapp.com/booking"
def test_api_get_code():
   result = requests.get(base_url)
   print(result)
   assert result.status_code == 200 
   
def test_api_get_book_byID():
    result = requests.get(f'{base_url}/1')
    responce_data = result.json()
    print(responce_data)
    exp_keys = [
    "firstname",
    "lastname",
    "totalprice",
    "depositpaid",
    "bookingdates",
    "additionalneeds"        
    ]
    assert len(exp_keys) == len(responce_data.keys())
    for key in exp_keys:
        assert key in responce_data.keys()
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