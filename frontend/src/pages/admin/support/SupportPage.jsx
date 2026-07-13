import Card from "../../../components/ui/Card";

const SupportPage = () => (
  <div>
    <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Support</h1>
    <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
      Help and documentation for the admin portal.
    </p>
    <Card className="p-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
      <p>
        This portfolio admin portal allows you to manage all content through the sidebar navigation.
        Each module supports create, read, update, and delete operations integrated with the Spring Boot backend.
      </p>
      <h3 className="font-semibold text-slate-900 dark:text-white">Common Tasks</h3>
      <ul className="list-disc pl-5 space-y-1">
        <li>Update your profile under <strong>About Me</strong></li>
        <li>Add projects and upload images from the project edit page</li>
        <li>Upload your resume PDF under <strong>Resume</strong></li>
        <li>Configure site-wide settings under <strong>Settings</strong></li>
        <li>Review contact form submissions under <strong>Messages</strong></li>
      </ul>
      <p className="text-xs text-slate-400">
        Backend API documentation is available at /swagger-ui when the server is running.
      </p>
    </Card>
  </div>
);

export default SupportPage;
