import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from './model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<ICategory[]> {
    return this.db.list<ICategory>('/categories',
      query => query.orderByChild('name')).snapshotChanges().pipe(
        map(action => action.map(snapshot => {
          let category = snapshot.payload.val();
          category.key = snapshot.key;
          return category;
        }))
      );
  }
}
