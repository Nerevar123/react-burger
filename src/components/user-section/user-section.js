import userSectionStyles from "./user-section.module.css";

function UserSection({ children, title }) {
  return (
    <section className={userSectionStyles.section}>
      <h1 className="text text_type_main-medium">{title}</h1>
      {children}
    </section>
  );
}

export default UserSection;
