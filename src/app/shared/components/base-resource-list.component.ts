import { Component, Injector, OnInit } from "@angular/core";
import { BaseResourceModel } from "../models/base-resource.model";
import { BaseResourceService } from "../services/base-resource.service";
import { RESOURCE_MODEL, SharedModule } from "../shared.module";


@Component({

    standalone: true, 
    template: '', 
    imports: [SharedModule]
})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    protected resources: T[];

    constructor(

        protected injector: Injector, 
        protected resourceService: BaseResourceService<T>
    ) {

        this.resources = Array.of(injector.get(RESOURCE_MODEL));
    }
    ngOnInit(): void {
        
        this.resourceService.getAll().subscribe({

            next: resources => this.resources = resources, 
            error: () => alert('Erro ao carregar a lista de recursos')
        });
    }

    deleteResource(resource: any) {
    
        const mustDelete = confirm('Deseja realmente deletar esse recurso?');

        if(mustDelete) {

            this.resourceService.delete(resource.id).subscribe({

                next: () => this.resources = this.resources.filter(element => element != resource), 
                error: () => alert('Erro ao tentar excluir recurso.')
            });
        }
  }
}