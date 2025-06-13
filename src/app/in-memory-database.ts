import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Category } from './pages/categories/shared/category.model';
import { Entry } from './pages/entries/shared/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        
        const categories: Category[] = [

            {id: 1, name: "Moradia", description: "Pagamentos de Contas da Casa"}, 
            {id: 2, name: "Saúde", description: "Plano de Saúde e Remédios"}, 
            {id: 3, name: "Lazer", description: "Cinema, Parques, Praias, etc"}, 
            {id: 4, name: "Salário", description: "Recebimento de Salário"}, 
            {id: 5, name: "Freelas", description: "Trabalhos como freelancer"}
        ];

        const entries: Entry[] = [

            {id: 1, name: 'Conta de luz', description: 'Conta de luz mensal', type: 'expense', amount: '300', date: '10/05/2025', paid: true, categoryId: categories[0].id, category: categories[0]} as Entry, 
            {id: 2, name: 'Seguro Desemprego', description: 'Seguro Desemprego', type: 'revenue', amount: '2400', date: '19/05/2025', paid: true, categoryId: categories[3].id, category: categories[3]} as Entry
        ];

        return {categories, entries};
    }
}