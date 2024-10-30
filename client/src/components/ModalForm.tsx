import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface ModalFormProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  data?: FormValues;
}

interface FormValues {
  email: string;
  date: string;
  subject: string;
  description: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ showModal, onClose, onSubmit, data }) => {
  const initialValues: FormValues = {
    email: data?.email || '',
    date: data?.date || '',
    subject: data?.subject || '',
    description: data?.description || '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    date: Yup.string().required('Date is required'),
    subject: Yup.string().required('Subject is required'),
    description: Yup.string().required('Description is required'),
  });

  if (!showModal) return null;
  return (
    <>
      <div className="fixed z-40 inset-0 transition-opacity bg-gray-500 opacity-75"></div>
      <div className="fixed z-40 inset-0 overflow-y-auto flex items-center justify-center bg-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ values, handleChange }) => (
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
                          name="email"
                          type="email"
                          className="w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-r-lg h-10 px-4"
                          placeholder="Email"
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                      </div>

                      <div className="mb-3 space-y-2 w-full text-xs">
                        <label className="font-semibold text-gray-600 py-2">Date</label>
                        <Field
                          name="date"
                          type="datetime-local"
                          className="w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-r-lg h-10 px-4"
                          placeholder="Select a date"
                        />
                        <ErrorMessage name="date" component="div" className="text-red-500 text-xs" />
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
                          name="description"
                          as="textarea"
                          className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-4 px-4"
                          placeholder="Enter description"
                          rows={4}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
                        <p className="text-xs text-gray-400">{values.description.length} characters</p>
                      </div>

                      <div className="mt-5 flex row gap-5">
                        <button
                          type="submit"
                          className="flex-1 text-sm flex items-center justify-center bg-slate-800 rounded hover:bg-slate-700 text-white py-3 px-6 mt-4"
                        >
                          Submit
                        </button>
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
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
