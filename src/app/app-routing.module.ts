import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import * as path from "path";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { SuccessComponent } from "./pages/success/success.component";
import { CancelComponent } from "./pages/cancel/cancel.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  { path: "success", component: SuccessComponent },
  { path: "cancel", component: CancelComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
