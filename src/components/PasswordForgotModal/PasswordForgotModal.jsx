// import React, { useState } from 'react';
// import './PasswordForgotModal.scss';

// export default function PasswordForgotModal() {
//   const [email, setEmail] = useState('');
//   const [resetToken, setResetToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     // Add any validation you need for the email
//     if (!email) {
//       setMessage('Please enter your email.');
//       return;
//     }

//     // Set loading state while making the API request
//     setIsLoading(true);
//     try {
//       // Make API request to send the email
//       const response = await fetch('https://back.komirka.pp.ua/api/v1/public/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       console.log(data);
//       // Handle the response from the API
//       if (response.ok) {
//         setMessage(data.message);
//         setResetToken(data.resetToken); // Assuming the API response includes a reset token
//       } else {
//         setMessage(data.error);
//       }
//     } catch (error) {
//       console.error('Error sending email:', error);
//       setMessage('An error occurred. Please try again later.');
//     } finally {
//       // Reset loading state
//       setIsLoading(false);
//     }
//   };

//   const handlePasswordReset = async () => {
//     // Add any validation you need for the new password
//     if (!newPassword) {
//       setMessage('Please enter a new password.');
//       return;
//     }

//     // Set loading state while making the API request
//     setIsLoading(true);

//     try {
//       // Make API request to reset password with the reset token
//       const response = await fetch(`https://back.komirka.pp.ua/api/v1/public/reset-password/${resetToken}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ newPassword }),
//       });

//       const data = await response.json();

//       // Handle the response from the API
//       if (response.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.error);
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error);
//       setMessage('An error occurred. Please try again later.');
//     } finally {
//       // Reset loading state
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label className="label">
//           Email:
//           <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
//         </label>
//         <button className="btn btn-blue" type="submit" disabled={isLoading}>
//           {isLoading ? 'Відправляємо...' : 'Відправити'}
//         </button>
//       </form>

//       {resetToken && (
//         <div>
//           <h2>Reset Password</h2>
//           <form
//             onSubmit={e => {
//               e.preventDefault();
//               handlePasswordReset();
//             }}>
//             <label>
//               New Password:
//               <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
//             </label>
//             <button type="submit" disabled={isLoading}>
//               {isLoading ? 'Resetting...' : 'Reset Password'}
//             </button>
//           </form>
//         </div>
//       )}

//       {message && <p>{message}</p>}
//     </div>
//   );
// }
}
