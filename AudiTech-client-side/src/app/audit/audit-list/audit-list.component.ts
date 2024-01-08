import { Component } from '@angular/core';
import { AuditService } from '../../services/api/audit/audit.service';
import { SharedService } from '../../services/shared/shared.service';
import { AuditRepresentaion } from '../../services/api/models/audit-representation';

@Component({
  selector: 'app-audit-list',
  templateUrl: './audit-list.component.html',
  styleUrl: './audit-list.component.css'
})
export class AuditListComponent {

  audits: AuditRepresentaion[] = [];
  auditId!: string;
  name!: string;

  constructor(private auditService: AuditService,public sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadAudits();
  }

  loadAudits(): void {
    this.auditService.getAllAudits().subscribe(
      (audits) => {
        this.audits = audits;
        console.log(this.audits);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
