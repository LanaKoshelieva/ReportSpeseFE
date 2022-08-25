import { HttpHeaders } from "@angular/common/http";



export function requestOptions() 
{                       
  const headerDict = 
  {
  'userMail': localStorage.getItem('userMail')  ?? '',
  'userPassword': localStorage.getItem('userPassword') ?? ''
 /* 'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type', */
  }
  return {headers: new HttpHeaders(headerDict)};
}

