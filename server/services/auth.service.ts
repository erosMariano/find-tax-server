import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http"
import { environment } from "../../environments/environment.development"
import { Observable, catchError, map, of } from "rxjs"
import { StorageService } from "./storage.service"
import { Login } from "../interfaces/login"
import { SessionService } from "./session.service"

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isAuthenticated: boolean = false

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private sessionService: SessionService
  ) { }

  async login(loginInfo: Login) {
    try {
      switch(loginInfo.type) {
      case "google":
        this.isAuthenticated = true
        window.location.href = `${environment.server}/auth/google`
        return
      case "linkedin":
        this.isAuthenticated = true
        window.location.href = `${environment.server}/auth/linkedin`
        return
      }

      this.isAuthenticated = true
      return this.http.post<any>(`${environment.server}/auth/login`, loginInfo.data)

    } catch (error) {
      this.isAuthenticated = false
    }

    return
  }

  async createAccount(data: any) {
    return this.http.post<unknown>(`${environment.server}/account`, data)
  }

  public getAuthHeaders() {
    const authHeader = new HttpHeaders({
      "Authorization": `Bearer ${this.sessionService.getToken()}`
    })

    return authHeader
  }

  getToken(): string | null {
    return this.sessionService.getToken() ?? null;
  }

  validateAccountJWT(): Observable<boolean> {
    const token = this.storageService.getItem("token")

    if (!token) {
      return of(false)
    }

    return this.http.get<unknown>(`${environment.server}/validate/jwt`, { observe: "response" })
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status === 200) {
            return true
          }

          return false
        }),
        catchError((err) => {
          console.log(err)
          return of(false)
        }
        )
      )
  }

  logout() {
    this.isAuthenticated = false
    this.sessionService.logout()
  }

  logoutWithAlertReason(reason: string) {
    this.isAuthenticated = false
    this.sessionService.logoutWithAlertReason(reason)
  }
}
