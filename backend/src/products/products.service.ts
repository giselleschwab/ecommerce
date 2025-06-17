import { Injectable } from '@nestjs/common';
import axios from 'axios';

type ExternalProduct = {
  id: string;
  nome: string;
  descricao?: string;
  imagem: string;
  preco: string;
};

@Injectable()
export class ProductsService {
  private brazilianApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeanApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  async getAll() {
    const brResponse = await axios.get<ExternalProduct[]>(this.brazilianApi);
    const euResponse = await axios.get<ExternalProduct[]>(this.europeanApi);

    const normalize = (data: ExternalProduct[], source: string) =>
      data.map((item) => ({
        id: `${source}-${item.id}`,
        name: item.nome,
        price: parseFloat(item.preco),
        description: item.descricao || '',
        image: item.imagem,
        provider: source,
      }));

    return [
      ...normalize(brResponse.data, 'brazilian'),
      ...normalize(euResponse.data, 'european'),
    ];
  }

  async getById(id: string) {
    const [source, realId] = id.split('-');
    const url =
      source === 'brazilian'
        ? `${this.brazilianApi}/${realId}`
        : `${this.europeanApi}/${realId}`;

    const response = await axios.get<ExternalProduct>(url);
    const data = response.data;

    return {
      id,
      name: data.nome,
      price: parseFloat(data.preco),
      description: data.descricao || '',
      image: data.imagem,
      provider: source,
    };
  }
}
