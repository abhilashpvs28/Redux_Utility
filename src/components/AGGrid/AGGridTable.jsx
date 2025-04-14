import { AgGridReact } from "ag-grid-react";

import { PaginationModule } from "ag-grid-community";
import { ClientSideRowModelModule, ModuleRegistry, ValidationModule,TextFilterModule,NumberFilterModule,DateFilterModule, CustomFilterModule,CellStyleModule,QuickFilterModule      } from "ag-grid-community";


ModuleRegistry.registerModules([ClientSideRowModelModule,ValidationModule,PaginationModule,TextFilterModule,NumberFilterModule,DateFilterModule, CustomFilterModule,CellStyleModule,QuickFilterModule ]);
const AGGridTable = ({rowData, columnDefs, onGridReady, quickFilterText}) => {


    return(
        <div className="ag-theme-alpine" style={{height:500, width: "100%"}}>
                <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination = {true}
                paginationPageSize={10}
                quickFilterText={quickFilterText}
                paginationPageSizeSelector = {[10,20,50,100]}
                onGridReady={onGridReady}
                animateRows={true}
                />
        </div>
    )
}

export default AGGridTable;