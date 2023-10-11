// pages/budget.tsx
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CreateBudget from "~/components/createbudget";
import EditBudget from "~/components/editbudget";
import { Sidebar } from "~/components/sidebar";
import { Inputs, InputsDTO, InputsInsert } from "~/models/models";
import { api } from "~/utils/api";


export default function Budget() {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Inputs | null>(null);
  
  
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedBudgets, setDisplayedBudgets] = useState<Inputs[]>([]); 

  const [searchTerm, setSearchTerm] = useState('')


  const myBudgets = api.budget.myBudgets.useQuery({ searchTerm : ""} );


  useEffect(() => {
    if (myBudgets?.data) {
      setDisplayedBudgets(myBudgets.data.slice(0, PER_PAGE).map(transformBudget));  }
  }, [myBudgets?.data]);


  
  const PER_PAGE = 10; 
  const pageCount = myBudgets?.data ? Math.ceil(myBudgets.data.length / PER_PAGE) : 0;

  const handleSearch = (searchTerm : string) => {
    const searchedBudgets = api.budget.myBudgets.useQuery({ searchTerm : searchTerm} );
    setDisplayedBudgets(searchedBudgets.data.slice(0, PER_PAGE).map(transformBudget))

  }
  
  
  const transformBudget = (budget: any): Inputs => {
    return {
      id: budget.id,
      user_id:  budget.user_id,
      product:  budget.product,
      paid:  budget.paid,
      change:  budget.change,
      amount:  budget.amount,
      remarks:  budget.remarks,
      location:  budget.location,
      auto_remarks:  budget.auto_remarks,
      category:  budget.category,
      transactionDate:  budget.transaction_date.toString(),
    };
  }



const handlePageClick = ({ selected }: { selected: number }) => {
  const offset = selected * PER_PAGE;
  setDisplayedBudgets(myBudgets.data.slice(offset, offset + PER_PAGE).map(transformBudget));
  setCurrentPage(selected);
};

  const handleProductClick = (budget: Inputs) => {

    let inputs : Inputs = {
      id: budget.id,
      user_id:  budget.user_id,
      product:  budget.product,
      paid:  budget.paid,
      change:  budget.change,
      amount:  budget.amount,
      remarks:  budget.remarks,
      location:  budget.location,
      auto_remarks:  budget.auto_remarks,
      category :  budget.category,
      transactionDate:  budget.transactionDate.toString()
    }

    setSelectedBudget(inputs);
  };

   
  return (
    <>
     <Sidebar/>
     <main className={`flex min-h-screen flex-col items-center bg-gradient-to-b from-[#efeff0] to-[#efeff0] ${isSidebarOpen ? 'lg:ml-[300px]' : ''}`}>      
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold leading-tight">My Budgets</h2>
          <div className="flex space-x-4">
          <input type="text"
              placeholder="Search"
              onChange={(event) => {
                handleSearch(event.target.value)
              }}
            />

            <button onClick={() => setModalOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Extract
            </button>
          </div>
        </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product 
                  </th>
                   <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount 
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                     Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedBudgets.map((budget, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap cursor-pointer" onClick={() => handleProductClick(budget)}><b>{budget.product}</b></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap" >{budget.amount}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{budget.paid}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap" >{budget.change}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-600 whitespace-no-wrap">{budget.transactionDate}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center my-6">
          <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"react-paginate"}
              activeClassName={"active"}
          />
          </div>
        </div>
          </div>
        </div>
      </main>
       
       
  {isModalOpen && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div onClick={() => setModalOpen(false)} className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-2xl">Add Budget</h2>
          </div>
          <CreateBudget/>
        </div>
      </div>
    </div>
)}

{selectedBudget && (
    <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div onClick={() => setSelectedBudget(null)} className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="mt-3 sm:mt-5">
            <div className="mt-2">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            &nbsp;&nbsp;&nbsp;{selectedBudget.product}
            </h3>
                <EditBudget id={selectedBudget.id} data={selectedBudget} />
            </div>
          </div>
      </div>
    </div>
  </div>
)}

   
    </>
  );
}