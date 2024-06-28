import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NotesComponent } from './notes.component';
import { NoteService } from '../../note.service';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let noteService: jasmine.SpyObj<NoteService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const noteServiceSpy = jasmine.createSpyObj('NoteService', ['getNoteByIndex', 'addNote', 'updateNote']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = {
      queryParams: of({ index: 1 })
    } as any;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [NotesComponent],
      providers: [
        { provide: NoteService, useValue: noteServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    noteService.getNoteByIndex.and.returnValue({ title: 'Test Note', content: 'Test Content' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize note from queryParams', () => {
    component.ngOnInit();
    expect(noteService.getNoteByIndex).toHaveBeenCalledWith(1);
    expect(component.title).toBe('Test Note');
    expect(component.content).toBe('Test Content');
  });

  it('should call addNote when saveNote is called and noteIndex is null', () => {
    component.noteIndex = null;
    component.title = 'New Note';
    component.content = 'New Content';
    component.saveNote();
    expect(noteService.addNote).toHaveBeenCalledWith({ title: 'New Note', content: 'New Content' });
    expect(router.navigate).toHaveBeenCalledWith(['/user']);
  });

  it('should call updateNote when saveNote is called and noteIndex is not null', () => {
    component.noteIndex = 1;
    component.title = 'Updated Note';
    component.content = 'Updated Content';
    component.saveNote();
    expect(noteService.updateNote).toHaveBeenCalledWith(1, { title: 'Updated Note', content: 'Updated Content' });
    expect(router.navigate).toHaveBeenCalledWith(['/user']);
  });

  it('should display "Update Note" button when noteIndex is not null', () => {
    component.noteIndex = 1;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.save');
    expect(button?.textContent).toContain('Update Note');
  });

  it('should display "Save" button when noteIndex is null', () => {
    component.noteIndex = null;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button.save');
    expect(button?.textContent).toContain('Save');
  });
});
