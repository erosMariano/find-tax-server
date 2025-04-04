import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: "root"
})
export class LeisIncentivoService {

  constructor(
    private http: HttpClient
  ) { }

  getLeisIncentivo(): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/leis`)
  }

  getLeiByUUID(uuid: string): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/lei/${uuid}`)
  }

  getFacilitadorTotalByUUID(uuid: string): Observable<unknown> {
    return this.http.get<unknown>(`${environment.server}/facilitador/${uuid}/total`)
  }
}
