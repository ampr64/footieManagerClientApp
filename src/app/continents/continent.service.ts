import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { ServiceHelper } from '../common/services/service-helper.service';
import { IContinent } from './models/icontinent';

@Injectable({
  providedIn: 'root'
})
export class ContinentService {

  constructor(private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string, private _helper: ServiceHelper) { }

  get(): Observable<IContinent[]> {
    let url_ = this._baseUrl + "api/Continents";
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this._http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGet(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGet(<any>response_);
        } catch (e) {
          return <Observable<IContinent[]>><any>_observableThrow(e);
        }
      } else
        return <Observable<IContinent[]>><any>_observableThrow(response_);
    }));
  }

  protected processGet(response: HttpResponseBase): Observable<IContinent[]> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <IContinent[]>JSON.parse(_responseText, this._helper.jsonParseReviver);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<IContinent[]>(<any>null);
  }

  getDetail(id: number): Observable<IContinent> {
    let url_ = this._baseUrl + "api/Continents/{id}";
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined.");
    url_ = url_.replace("{id}", encodeURIComponent("" + id));
    url_ = url_.replace(/[?&]$/, "");

    let options_: any = {
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Accept": "application/json"
      })
    };

    return this._http.request("get", url_, options_).pipe(_observableMergeMap((response_: any) => {
      return this.processGetDetail(response_);
    })).pipe(_observableCatch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetDetail(<any>response_);
        } catch (e) {
          return <Observable<IContinent>><any>_observableThrow(e);
        }
      } else
        return <Observable<IContinent>><any>_observableThrow(response_);
    }));
  }

  protected processGetDetail(response: HttpResponseBase): Observable<IContinent> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } }
    if (status === 200) {
      return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        let result200: any = null;
        result200 = _responseText === "" ? null : <IContinent>JSON.parse(_responseText, this._helper.jsonParseReviver);
        return _observableOf(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return this._helper.blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
        return this._helper.throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return _observableOf<IContinent>(<any>null);
  }
}
