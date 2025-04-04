import { Injectable } from "@angular/core"
import { StorageService } from "./storage.service"
import { StorageKeys } from "../interfaces/storage-keys"
import { Router } from "@angular/router"

@Injectable({
  providedIn: "root"
})
export class SessionService {
  private storageKeys: StorageKeys = {
    token: "",
    email: "",
    name: "",
    role: "",
    accountFields: "",
  }

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  saveAccountToken(token: string) {
    this.storageService.setItem([{ key: "token", val: token }])
  }

  saveAccountEmail(email: string) {
    this.storageService.setItem([{ key: "email", val: email }])
  }

  saveAccountRole(role: string) {
    this.storageService.setItem([{ key: "role", val: role }])
  }

  saveAccountName(name: string) {
    this.storageService.setItem([{ key: "name", val: name }])
  }

  saveAccountFields(fields: any) {
    const fieldsStr = JSON.stringify(fields)
    this.storageService.setItem([ { key: "accountFields", val: fieldsStr } ])
  }

  logout() {
    const storageKeys = Object.keys(this.storageKeys)
    for (let i = 0; i < storageKeys.length; ++i) {
      const key = storageKeys[i]
      this.storageService.setItem([{ key: key, val: "" }])
    }

    this.router.navigate(["/login"])
  }

  logoutWithAlertReason(reason: string) {
    const storageKeys = Object.keys(this.storageKeys)
    for (let i = 0; i < storageKeys.length; ++i) {
      const key = storageKeys[i]
      this.storageService.setItem([{ key: key, val: "" }])
    }

    this.router.navigate(["/login"], { queryParams: { auth: reason }, queryParamsHandling: "merge" })
  }

  getToken() {
    return this.storageService.getItem("token")
  }

  getEmail() {
    return this.storageService.getItem("email")
  }

  getRole() {
    return this.storageService.getItem("role")
  }

  getName() {
    return this.storageService.getItem("name")
  }

  getAccountFields() {
    const fieldsStr = this.storageService.getItem("accountFields")
    try {
      return JSON.parse(fieldsStr || "{}")
    } catch (error) {
      console.error("Erro ao passar os fields da conta:", error)
      return {}
    }
  }

  getNameFromFields() {
    return this.getAccountFields()["name"] || ""
  }

  getEmailFromFields() {
    return this.getAccountFields()["email"] || ""
  }

  getRoleFromFields() {
    return this.getAccountFields()["role"] || ""
  }

  getLastLogin() {
    return this.storageService.getItem("last_login")
  }

}
