import { Injectable } from '@nestjs/common';
import axios from 'axios';

type BrazilianProduct = {
  id: string;
  nome: string;
  descricao?: string;
  imagem: string;
  preco: string;
};

type EuropeanProduct = {
  id: string;
  name: string;
  description?: string;
  gallery?: string[];
  price: string;
};

type UnifiedProduct = BrazilianProduct | EuropeanProduct;

@Injectable()
export class ProductsService {
  private brazilianApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private europeanApi =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  async getAll() {
    const brResponse = await axios.get<BrazilianProduct[]>(this.brazilianApi);
    const euResponse = await axios.get<EuropeanProduct[]>(this.europeanApi);

    const normalize = (
      data: UnifiedProduct[],
      source: string,
    ): {
      id: string;
      name: string;
      price: number;
      description: string;
      image: string;
      provider: string;
    }[] =>
      data.map((item) => {
        if ('nome' in item) {
          return {
            id: `${source}-${item.id}`,
            name: item.nome,
            price: parseFloat(item.preco),
            description: item.descricao ?? '',
            image: item.imagem,
            provider: source,
          };
        } else {
          return {
            id: `${source}-${item.id}`,
            name: item.name,
            price: parseFloat(item.price),
            description: item.description ?? '',
            image: item.gallery?.[0] ?? '',
            provider: source,
          };
        }
      });

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

    const response = await axios.get<UnifiedProduct>(url);
    const item = response.data;

    if ('nome' in item) {
      return {
        id,
        name: item.nome,
        price: parseFloat(item.preco),
        description: item.descricao ?? '',
        image: item.imagem, // <-- diretamente da API
        provider: source,
      };
    } else {
      return {
        id,
        name: item.name,
        price: parseFloat(item.price),
        description: item.description ?? '',
        image: item.gallery?.[0] ?? '',
        provider: source,
      };
    }
  }
}
