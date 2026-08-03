export interface IStorageService {
  /**
   * Faz upload de um arquivo para o Storage configurado.
   * @param path Caminho/Nome final no bucket/diretório
   * @param buffer O conteúdo em buffer
   * @param mimeType O mimeType (ex: image/jpeg, model/obj)
   * @returns A URL pública ou path de acesso
   */
  upload(path: string, buffer: Buffer, mimeType: string): Promise<string>;

  /**
   * Remove um arquivo do Storage.
   * @param path O caminho interno salvo do arquivo.
   */
  delete(path: string): Promise<void>;
  
  /**
   * Obtém a URL pública do arquivo.
   * @param path Caminho do arquivo.
   */
  getUrl(path: string): string;
}
