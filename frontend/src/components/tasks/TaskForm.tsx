import { Formik, Form, Field, ErrorMessage } from "formik";

interface TaskFormProps {
  initialValues: any;
  validationSchema: any;
  fields: any[];
  selectOptions?: Record<string, { label: string; value: string }[]>;
  onSubmit: (values: any) => void;
}

const TaskForm = ({ initialValues, validationSchema, fields, selectOptions = {}, onSubmit }: TaskFormProps) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {() => (
        <Form className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium">{field.label}</label>

              {/* TEXTAREA */}
              {field.type === "textarea" ? (
                <Field
                  as="textarea"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full mt-1 px-4 py-3 border rounded-xl h-28"
                />
              ) : field.type === "select" ? (
                /* SELECT (API DRIVEN) */
                <Field as="select" name={field.name} className="w-full mt-1 px-4 py-3 border rounded-xl">
                  <option value="">{field.placeholder || "Select"}</option>

                  {(selectOptions[field.name] || []).map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Field>
              ) : (
                /* INPUT */
                <Field
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full mt-1 px-4 py-3 border rounded-xl"
                />
              )}

              <ErrorMessage name={field.name} component="p" className="text-sm text-red-500 mt-1" />
            </div>
          ))}

          {/* Hidden submit so modal confirm controls submit */}
          <button type="submit" hidden />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
