import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';

import { Router } from '@angular/router';
import { ReverseStringPipe } from '../../reverse-string.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../note.service';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let noteService:jasmine.SpyObj<NoteService>
  let router:jasmine.SpyObj<Router>

  beforeEach(async () => {
    const noteServiceSpy = jasmine.createSpyObj('NoteService', ['getNotes', 'deleteNote']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UserComponent, ReverseStringPipe],
      imports: [
        RouterTestingModule,
        FormsModule,
        CommonModule,
      ],
      providers: [
        { provide: NoteService, useValue: noteServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;


    noteService.getNotes.and.returnValue([
      { title: 'Note 1', content: 'Content 1' },
      { title: 'Note 2', content: 'Content 2' }
    ]);
    // fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    component.ngOnInit();
    expect(noteService.getNotes).toHaveBeenCalled();
    expect(component.notes.length).toBe(2);
    expect(component.notes[0].title).toBe('Note 1');
    expect(component.notes[1].title).toBe('Note 2');
  });

  it('should navigate to edit note on editNote call', () => {
    const index = 1;
    component.editNote(index);
    expect(router.navigate).toHaveBeenCalledWith(['/notes'], { queryParams: { index } });
  });

  it('should delete a note and update notes array', () => {
    component.ngOnInit();
    const initialNotesLength = component.notes.length;
    const indexToDelete = 0;

    component.deleteNote(indexToDelete);

    expect(noteService.deleteNote).toHaveBeenCalledWith(indexToDelete);
    expect(noteService.getNotes).toHaveBeenCalledTimes(2); 
    expect(component.notes.length).toBe(initialNotesLength - 1);
  });

  it('should display notes in the template', () => {
    component.ngOnInit();
    fixture.detectChanges(); 

    const compiled = fixture.nativeElement as HTMLElement;
    const noteTitles = compiled.querySelectorAll('h2');
    const noteContents = compiled.querySelectorAll('p');

    expect(noteTitles.length).toBe(2);
    expect(noteTitles[0].textContent).toContain('Title: Note 1');
    expect(noteTitles[1].textContent).toContain('Title: Note 2');
    expect(noteContents[0].textContent).toContain('Content 1');
    expect(noteContents[1].textContent).toContain('Content 2');
  });
});
