import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPqrsComponent } from './gestion-pqrs.component';

describe('GestionPqrsComponent', () => {
    let component: GestionPqrsComponent;
    let fixture: ComponentFixture<GestionPqrsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GestionPqrsComponent]
        });
        fixture = TestBed.createComponent(GestionPqrsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
