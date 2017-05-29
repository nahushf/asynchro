import { Component } from './components/Component';
import { Store } from 'redux';

export class Asynchro<T> {
    
    constructor(public store: Store<T>) {}
    component = Component(this.store);
    
}
