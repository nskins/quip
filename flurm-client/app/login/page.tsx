export default function Login() {
  return (
    <div>
      <form action={async () => { 'use server' }}>
        <input type="text" name="email" />
        <input type="text" name="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
