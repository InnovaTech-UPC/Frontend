import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'enclosure-table',
  standalone: true,
    imports: [
      MatButton,
      MatTableModule,
      MatPaginator,
      MatIcon
    ],
  templateUrl: './enclosure-table.component.html',
  styleUrl: './enclosure-table.component.css'
})
export class EnclosureTableComponent {

  @Input() dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = ['id', 'name', 'capacity', 'type', 'actions'];
  @Output() editEnclosure = new EventEmitter<number>();
  @Output() deleteEnclosure = new EventEmitter<number>();
  @Output() goToEnclosure = new EventEmitter<number>();

}
