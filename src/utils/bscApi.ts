const API_URL = 'https://private-9aad-note10.apiary-mock.com';

export interface IFetchRequestConfig {
  url: string;
  body?: any;
  method?: 'PUT' | 'GET' | 'POST' | 'DELETE';
}

export const getAllNotes = (): IFetchRequestConfig => ({
  url: `${API_URL}/notes`,
});

export const getNoteDetail = (id: string): IFetchRequestConfig => ({
  url: `${API_URL}/notes/${id}`,
});

export const updateNote = (id: string, body: any): IFetchRequestConfig => ({
  url: `${API_URL}/notes/${id}`,
  method: 'PUT',
  body,
});
export const createNote = (body: any): IFetchRequestConfig => ({
  url: `${API_URL}/notes`,
  method: 'POST',
  body,
});
export const removeNote = (id: string): IFetchRequestConfig => ({
  url: `${API_URL}/notes/${id}`,
  method: 'DELETE',
});
