import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { ServiceHelper } from '../common/services/service-helper.service';
import { ICountry } from './models/icountry';
import { NewCountryCommand } from './models/inewcountrycommand';
import { IUpdateCountryCommand } from './models/iupdatecountrycommand';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string, private _helper: ServiceHelper) {

  }

  
    get(): Observable<ICountry[]> {
      let url_ = this._baseUrl + "api/Countries";
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Accept": "application/json"
          })
      };

      return this._http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processGet(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processGet(<any>response_);
              } catch (e) {
                  return <Observable<ICountry[]>><any>_observableThrow(e);
              }
          } else
              return <Observable<ICountry[]>><any>_observableThrow(response_);
      }));
  }

  protected processGet(response: HttpResponseBase): Observable<ICountry[]> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          let result200: any = null;
          result200 = _responseText === "" ? null : <ICountry[]>JSON.parse(_responseText, this._helper.jsonParseReviver);
          return _observableOf(result200);
          }));
      } else if (status !== 200 && status !== 204) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<ICountry[]>(<any>null);
  }

  getDetail(id: number): Observable<ICountry> {
    let url_ = this._baseUrl + "api/Countries/{id}";
    if (id === undefined || id === null)
        throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_ : any = {
        observe: "response",
        responseType: "blob",
        headers: new HttpHeaders({
            "Accept": "application/json"
        })
    };

    return this._http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
        return this.processGetDetail(response_);
    })).pipe(_observableCatch((response_: any) => {
        if (response_ instanceof HttpResponseBase) {
            try {
                return this.processGetDetail(<any>response_);
            } catch (e) {
                return <Observable<ICountry>><any>_observableThrow(e);
            }
        } else
            return <Observable<ICountry>><any>_observableThrow(response_);
    }));
}

protected processGetDetail(response: HttpResponseBase): Observable<ICountry> {
    const status = response.status;
    const responseBlob =
        response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
    if (status === 200) {
        return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <ICountry>JSON.parse(_responseText, this._helper.jsonParseReviver);
        return _observableOf(result200);
        }));
    } else if (status !== 200 && status !== 204) {
        return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }));
    }
    return _observableOf<ICountry>(<any>null);
}

  new(command: NewCountryCommand): Observable<void> {
      let url_ = this._baseUrl + "api/Countries";
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(command);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json-patch+json",
          })
      };

      return this._http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processNew(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processNew(<any>response_);
              } catch (e) {
                  return <Observable<void>><any>_observableThrow(e);
              }
          } else
              return <Observable<void>><any>_observableThrow(response_);
      }));
  }

  protected processNew(response: HttpResponseBase): Observable<void> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return _observableOf<void>(<any>null);
          }));
      } else if (status !== 200 && status !== 204) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<void>(<any>null);
  }

  update(id: number, command: IUpdateCountryCommand): Observable<void> {
      let url_ = this._baseUrl + "api/Countries/{id}";
      if (id === undefined || id === null)
          throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

      const content_ = JSON.stringify(command);

      let options_ : any = {
          body: content_,
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
              "Content-Type": "application/json-patch+json",
          })
      };

      return this._http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processUpdate(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processUpdate(<any>response_);
              } catch (e) {
                  return <Observable<void>><any>_observableThrow(e);
              }
          } else
              return <Observable<void>><any>_observableThrow(response_);
      }));
  }

  protected processUpdate(response: HttpResponseBase): Observable<void> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return _observableOf<void>(<any>null);
          }));
      } else if (status !== 200 && status !== 204) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<void>(<any>null);
  }

  delete(id: number): Observable<void> {
      let url_ = this._baseUrl + "api/Countries/{id}";
      if (id === undefined || id === null)
          throw new Error("The parameter 'id' must be defined.");
      url_ = url_.replace("{id}", encodeURIComponent("" + id));
      url_ = url_.replace(/[?&]$/, "");

      let options_ : any = {
          observe: "response",
          responseType: "blob",
          headers: new HttpHeaders({
          })
      };

      return this._http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
          return this.processDelete(response_);
      })).pipe(_observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
              try {
                  return this.processDelete(<any>response_);
              } catch (e) {
                  return <Observable<void>><any>_observableThrow(e);
              }
          } else
              return <Observable<void>><any>_observableThrow(response_);
      }));
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
      const status = response.status;
      const responseBlob =
          response instanceof HttpResponse ? response.body :
          (<any>response).error instanceof Blob ? (<any>response).error : undefined;

      let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
      if (status === 200) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return _observableOf<void>(<any>null);
          }));
      } else if (status !== 200 && status !== 204) {
          return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
          return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
          }));
      }
      return _observableOf<void>(<any>null);
  }

}
