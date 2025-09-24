"use client";
import { Candidate, CandidateNote } from "@/interface/recruitment.interface";

class CandidateDataService {
  private candidates: Candidate[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Load initial data from localStorage or use empty array
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("candidates");
      if (stored) {
        try {
          this.candidates = JSON.parse(stored);
        } catch (error) {
          // console.error('Error loading candidates from localStorage:', error);
          this.candidates = [];
        }
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("candidates", JSON.stringify(this.candidates));
      // Notify listeners about data change
      this.listeners.forEach((listener) => listener());
    }
  }

  public addCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
    this.saveToStorage();
  }

  public getCandidates(): Candidate[] {
    return [...this.candidates]; // Return a copy to prevent external mutations
  }

  public updateStage(candidateId: string, newStageId: string): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate) {
      candidate.stageId = newStageId;
      this.saveToStorage();
      // console.log(`Candidate ${candidateId} moved to stage ${newStageId}`);
    } else {
      // console.error(`Candidate with id ${candidateId} not found`);
    }
  }

  public deleteCandidate(candidateId: string): void {
    const index = this.candidates.findIndex((c) => c.id === candidateId);
    if (index !== -1) {
      this.candidates.splice(index, 1);
      this.saveToStorage();
      // console.log(`Candidate ${candidateId} deleted`);
    }
  }

  public updateCandidate(
    candidateId: string,
    updates: Partial<Candidate>
  ): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate) {
      Object.assign(candidate, updates);
      this.saveToStorage();
      // console.log(`Candidate ${candidateId} updated`);
    }
  }

  public addNote(candidateId: string, note: CandidateNote): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate) {
      if (!candidate.notes) {
        candidate.notes = [];
      }
      candidate.notes.push(note);
      this.saveToStorage();
      // console.log(`Note added to candidate ${candidateId}`);
    }
  }

  public updateNote(candidateId: string, updatedNote: CandidateNote): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate && candidate.notes) {
      const noteIndex = candidate.notes.findIndex(
        (note) => note.id === updatedNote.id
      );
      if (noteIndex !== -1) {
        candidate.notes[noteIndex] = updatedNote;
        this.saveToStorage();
        // console.log(`Note ${updatedNote.id} updated for candidate ${candidateId}`);
      }
    }
  }

  public deleteNote(candidateId: string, noteId: string): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate && candidate.notes) {
      const noteIndex = candidate.notes.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        candidate.notes.splice(noteIndex, 1);
        this.saveToStorage();
        // console.log(`Note ${noteId} deleted from candidate ${candidateId}`);
      }
    }
  }

  // Add listener for data changes (useful for React components)
  public addListener(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public getCandidatesByStage(stageId: string): Candidate[] {
    return this.candidates.filter((candidate) => candidate.stageId === stageId);
  }
}

export const candidateDataService = new CandidateDataService();
