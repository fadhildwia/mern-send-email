import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useGetSendEmailListById from '../hooks/useGetSendEmailListById';
import Loading from './Loading';

export interface FormValues {
  recipientEmail: string;
  scheduledDate: string;
  subject: string;
  content: string;
  id?: string;
}

export interface IDataModalForm {
  isShow: boolean;
  isNew: boolean;
  id?: string;
  scheduledDate?: string;
}

export const initDataModalForm = {
  isShow: false,
  date: "",
  isNew: true,
  id: ''
}

interface ModalFormProps {
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  onUpdate: (values: FormValues) => void;
  onDelete: (values: FormValues) => void;
  dataModalForm: IDataModalForm;
}

const ModalForm: React.FC<ModalFormProps> = ({ dataModalForm, onSubmit, onUpdate, onDelete, onClose }) => {
  const [existingData, setExistingData] = useState<FormValues>()

  const { isLoading: isLoadingUser } = useGetSendEmailListById({
    id: dataModalForm.id as string,
    options: {
      enabled: !!dataModalForm.id,
      onSuccess: (res) => {
        setExistingData(res as unknown as FormValues)
      },
    }
  });

  const initialValues: FormValues = {
    recipientEmail: existingData?.recipientEmail || '',
    scheduledDate: dataModalForm?.scheduledDate || (existingData?.scheduledDate && new Date(existingData?.scheduledDate).toISOString().slice(0, 19)) || '',
    subject: existingData?.subject || '',
    content: existingData?.content || '',
  };

  const validationSchema = Yup.object({
    recipientEmail: Yup.string().email('Invalid email address').required('Email is required'),
    scheduledDate: Yup.string().required('Date is required'),
    subject: Yup.string().required('Subject is required'),
    content: Yup.string().required('Description is required'),
  });

  if (!dataModalForm.isShow) return null;
  return (
    <>
      <Loading isShow={isLoadingUser} />
      <div className="fixed z-40 inset-0 transition-opacity bg-gray-500 opacity-75"></div>
      <div className="fixed z-40 inset-0 overflow-y-auto flex items-center justify-center bg-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              dataModalForm.isNew ? onSubmit(values) : onUpdate({ ...values, id: dataModalForm.id as string });
            }}
          >
            {({ values, handleChange }) => {
              return (
              <Form className="grid gap-8 grid-cols-1">
                <div className="flex flex-col">
                  <div className="flex flex-col sm:flex-row items-center">
                    <h2 className="font-semibold text-lg mr-auto">Send Email</h2>
                  </div>
                  <div className="mt-5">
                    <div className="form">
                      <div className="mb-3 space-y-2 w-full text-xs">
                        <label className="font-semibold text-gray-600 py-2">Email</label>
                        <Field
                          name="recipientEmail"
                          type="email"
                          className="w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-r-lg h-10 px-4"
                          placeholder="Email"
                        />
                        <ErrorMessage name="recipientEmail" component="div" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3 space-y-2 w-full text-xs">
                        <label className="font-semibold text-gray-600 py-2">Date</label>
                        <Field
                          name="scheduledDate"
                          type="datetime-local"
                          className="w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-r-lg h-10 px-4"
                          placeholder="Select a date"
                        />
                        <ErrorMessage name="scheduledDate" component="div" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3 space-y-2 w-full text-xs">
                        <label className="font-semibold text-gray-600 py-2">Subject</label>
                        <Field
                          name="subject"
                          type="text"
                          className="w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-r-lg h-10 px-4"
                          placeholder="Subject"
                        />
                        <ErrorMessage name="subject" component="div" className="text-red-500 text-xs" />
                      </div>

                      <div className="w-full">
                        <label className="font-semibold text-gray-600 py-2">Description</label>
                        <Field
                          name="content"
                          as="textarea"
                          className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                          placeholder="Enter description"
                          rows={4}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                        <p className="text-xs text-gray-400">{values.content.length} characters</p>
                      </div>

                      <div className="mt-5 flex row gap-5">
                        {dataModalForm.isNew ? (
                          <button
                            type="submit"
                            className="flex-1 text-sm flex items-center justify-center bg-slate-800 rounded hover:bg-slate-700 text-white py-3 px-6 mt-4"
                          >
                            Submit
                          </button>
                        ): (
                          <>
                            <button
                              type="submit"
                              className="flex-1 text-sm flex items-center justify-center bg-slate-800 rounded hover:bg-slate-700 text-white py-3 px-6 mt-4"
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete({ ...values, id: dataModalForm.id })}
                              className="flex-1 text-sm flex items-center justify-center bg-red-800 rounded hover:bg-red-700 text-white py-3 px-6 mt-4"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 text-sm flex items-center justify-center bg-white rounded hover:bg-gray-300 text-black py-3 px-6 mt-4 border border-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            )}}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
