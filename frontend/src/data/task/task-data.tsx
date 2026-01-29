import * as Yup from "yup";

export const taskInitialValues = {
  title: "",
  description: "",
  assignedTo: "",
};

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required("Task title is required")
    .min(3, "Title must be at least 3 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  assignedTo: Yup.string().required("Please assign a user"),
});

export const taskFormFields = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
    placeholder: "Enter task title",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Describe the task",
  },
  {
    name: "assignedTo",
    label: "Assigned User",
    type: "select",
    options: [
      { label: "Select user", value: "" },
      { label: "User A", value: "user_a" },
      { label: "User B", value: "user_b" },
    ],
  },
];
