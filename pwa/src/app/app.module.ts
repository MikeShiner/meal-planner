import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { DayViewComponent } from "./day-view/day-view.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { MealSelectionDialogComponent } from "./meal-selection-dialog/meal-selection-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { environment } from "../environments/environment";
import { OptionsComponent } from './options/options.component';

@NgModule({
  declarations: [AppComponent, DayViewComponent, MealSelectionDialogComponent, OptionsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
