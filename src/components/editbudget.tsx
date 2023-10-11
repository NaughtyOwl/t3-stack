import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatDateToDDMMYYYY } from "~/helpers/helpers";
import { Inputs } from "~/models/models";
import { api } from "~/utils/api"; 

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import React from "react";


const EditBudget : React.FC<{id: string, data : Inputs}> = ({id, data}) => {

  const editBudget = api.budget.edit.useMutation()
  const deleteBudget = api.budget.deleteBudget.useMutation()

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>({
    defaultValues: data
   
  });
 
  const [selectedDay, setSelectedDay] = useState<Date>();

  const footer = selectedDay ? (
    <p>Transaction Date {format(selectedDay, 'PPP')}.</p>
  ) : (
    <p>Please pick a day.</p>
  );
  
 

  useEffect(() => {
    if (data.category) {
      setValue('category', data.category);
    }
  }, [setValue, data]);
  
  useEffect(() => {
    setSelectedDay(new Date(data.transactionDate))
  }, [setSelectedDay, data]);
  

  const onDelete =async (id : string) => {
    try {
      await deleteBudget.mutateAsync({
        id : id
      })
      setIsOpenDelete(false)
    } catch (error) {
      console.log(error)
    }
  }


  const onSubmit= async (formData:Inputs) => {
    let currentDate = new Date();
    try {
      await editBudget.mutateAsync({
        id : id,
        product : formData.product,
        paid : Number(formData.paid),
        change : Number(formData.change),
        amount : Number(formData.amount),
        remarks : formData.remarks,
        location : formData.location,
        category : formData.category,
        updated_date: currentDate,
        transaction_date: selectedDay
      })
      setIsOpen(true);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto mt-5 px-4 py-6 bg-white rounded-lg shadow-md">
      <div className="hidden">
        <input id="id" {...register("id")} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product">
          Product
        </label>
        <input {...register("product", { required: "Product is required" })} id="product" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.product && <p className="text-red-500 text-xs italic">{errors.product.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paid">
          Amount Paid
        </label>
        <input type="number" step={0.01} {...register("paid", { required: "Amount is required" })} id="paid" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.paid && <p className="text-red-500 text-xs italic">{errors.paid.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="change">
          Change
        </label>
        <input type="number" step={0.01} {...register("change", { required: "Change is required" })} id="change" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.change && <p className="text-red-500 text-xs italic">{errors.change.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input type="number" step={0.01} {...register("amount", { required: "Amount is required"  })} id="amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.amount && <p className="text-red-500 text-xs italic">{errors.amount.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
          Location
        </label>
        <input {...register("location",  { required: "Location is required"  })} id="remarks" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
          Remarks
        </label>
        <textarea {...register("remarks", { required: false })} id="remarks" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
        Category
    </label>
        <select {...register("category", { required: "Category is required" })} id="category" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="">Select...</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Items">Items</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Groceries">Groceries</option>
          <option value="Services">Services</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Online Payment">Online Payment</option>
          <option value="Clothing">Clothing</option>
          <option value="Transportation">Transportation</option>
          <option value="Insurance">Insurance</option>
          <option value="Donation">Donation</option>
        </select>
        {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
    </div>

      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionDate">
              Transaction Date
          </label>
          
          <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              footer={footer}
        />
          {errors.transactionDate && <p className="text-red-500 text-xs italic">{errors.transactionDate.message}</p>}
      </div>
      <div className="mb-6">
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Save
        </button>
      </div>
      <div className="mb-6">
        <button  onClick={() => setIsOpenDelete(true)}  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
          Remove
        </button>
      </div>
    </form>

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Success
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your data was saved successfully.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    )}

{isOpenDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Alert
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to remove this data.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button type="button" onClick={() => onDelete(data.id)}  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
                  Delete
                </button>
              </div>
              <div className="mt-5 sm:mt-6">
                <button type="button" onClick={() => setIsOpen(false)} className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    )}


    </>
  )
}

export default EditBudget;
