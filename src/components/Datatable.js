import React from "react";
import "jquery/dist/jquery.slim"
import "jszip"
import "pdfmake"
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.html5"
import "datatables.net-buttons/js/buttons.colVis"
import "datatables.net-buttons/js/buttons.flash"
import "datatables.net-buttons/js/buttons.print"
import "datatables.net-responsive-dt/js/responsive.dataTables.min.mjs"
import "datatables.net-responsive-dt"
import $ from "jquery"
let datos = [
  {
    "title": "mr",
    "firstname": "Lawson",
    "lastname": "Luke",
    "age": 28,
    "occupation": "Software Developer",
    "hobby": "coding"
  },
  {
    "title": "mr",
    "firstname": "Michael",
    "lastname": "Jackson",
    "age": 35,
    "occupation": "Singer",
    "hobby": "dancing"
  },
  {
    "title": "mr",
    "firstname": "Janet",
    "lastname": "Jackson",
    "age": 35,
    "occupation": "Singer",
    "hobby": "dancing"
  }
]
class TableViews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    if ($.fn.dataTable.isDataTable('#table')) {
      $('#table').DataTable().clear();
      $('#table').DataTable().destroy();
      $('#table').empty();
      $('#table').css("width", "100%")
    }
    if (!$.fn.DataTable.isDataTable("#table")) {
      $(document).ready(function () {
        $("#table").dataTable({
          pageLength: 10,
          stateSave: true,
          responsive: true,
          "bDestroy": true,
          "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
          },
          dom: "Bfrtip",
          select: {
            style: "single",
          },
          buttons: [
            {
              extend: "csv",
              className: "btn btn-secondary ",
            },
          ],

          fnRowCallback: function (
            nRow,
            aData,
            iDisplayIndex,
            iDisplayIndexFull
          ) {

          },

          lengthMenu: [
            [10, 20, 30, 50, -1],
            [10, 20, 30, 50, "All"],
          ],
          columnDefs: [
            {
              className: 'dtr-control',
              orderable: false,
              targets: 0
            }],
          order: [1, 'asc'],

        });

      });
    }
  }
  showDatos = () => {
    try {
      return datos.map((item, index) => {
        return (
          <tr key={index}>
            <td className="">

            </td>
            <td className="text-xs font-weight-bold">{item.firstname + ' ' + item.lastname}</td>
            <td className="text-xs font-weight-bold">{item.age}</td>
            <td className="text-xs font-weight-bold">{item.hobby}</td>
            <td className="text-xs font-weight-bold">{item.occupation}</td>

          </tr>
        )
      });
    } catch (error) { }
  }
  render() {
    return (
      <div className="container " >
        <h5>Documentos</h5>
        <div className="bg-white border">
          <div className="w-100 py-3 bg-dark">
            <div className="text-white ps-2">
              <i className="bi bi-file-earmark-pdf"></i> Documentos
            </div>
          </div>
          <div className="p-2">
            <div className=" table-responsive p-0 pb-2">
              <table id="table" className="table table-striped  table-bordered nowrap"
                style={{
                  width: "100%"
                }}
              >
                <thead className="border pt-2">
                  <tr className="border pt-2">
                    <th ></th>
                    <th >Name</th>
                    <th >Age</th>
                    <th >Hobby</th>
                    <th >Occupation</th>

                  </tr>
                </thead>

                <tbody>
                  {this.showDatos()}
                </tbody>
              </table>
            </div>

          </div>

        </div>



      </div>

    );
  }
}

export default TableViews;
