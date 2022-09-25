import { Injectable, NgModule } from '@angular/core';
import { Resolve, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import{ PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Title } from '@angular/platform-browser';
import { ChildAComponent } from './first/child-a/child-a.component';
import { ChildBComponent } from './first/child-b/child-b.component';

const routes: Routes = [
  {path:'first-component',component:FirstComponent
  ,children:[
              {path:'child-a',title:'Frist Child A',component:ChildAComponent},
              {path:'child-b',title:'Frist Child B',component:ChildBComponent}
            ]
  },
  {path:'second-component',component:SecondComponent},
  {path:'',redirectTo:'first-component',pathMatch:'full'}, // redirect to `first-component`
  {path:'**',component:PageNotFoundComponent}// Wildcard route for a 404 page
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My Application | ${title}`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
    {provide:TitleStrategy,useClass:TemplatePageTitleStrategy}
  ]
})
export class AppRoutingModule { }
