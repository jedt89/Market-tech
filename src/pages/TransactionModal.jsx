// import React from 'react';

// const TransactionModal = () => {
//   const {
//     handleCleanCart,
//     handleCreateTransaction,
//     handleDeleteCartItem,
//     handleUpdateCartItem,
//     handleGetCartItems
//   } = useService();

//   const {
//     currentCart,
//     showCart,
//     handleCloseCart,
//     setCurrentCart,
//     getTotalPrice
//   } = useContext(CartContext);
//   const { token, user, setLoading } = useContext(MainContext);

//   return (
//     <Modal
//       show={showCart}
//       onHide={handleCloseCart}
//       centered
//       backdrop='static'
//       size='lg'
//     >
//       <Modal.Header className='text-white d-flex justify-content-between align-items-center'>
//         <Modal.Title className='modal-title'>Carrito de Compras</Modal.Title>
//         <IoIosClose
//           className='text-white close-icon'
//           onClick={handleCloseCart}
//         />
//       </Modal.Header>
//       <Modal.Body className='modal-body'>
//         {!currentCart.products || currentCart.products.length === 0 ? (
//           <div className='flex-column justify-center align-items-center gap-1rem'>
//             <TfiShoppingCart
//               className='text-info'
//               style={{ fontSize: '4rem' }}
//             />
//             <p className='text-center text-white'>
//               No tienes productos en tu carrito.
//             </p>
//           </div>
//         ) : (
//           <ListGroup className='cart-list width-100-percent'>
//             {currentCart.products.map((item, index) => (
//               <ListGroup.Item
//                 key={index}
//                 className='text-white border-yellow border-radius-8 cart-item background-transparent width-100-percent padding0'
//               >
//                 <div
//                   className='display-flex align-items-start justify-end text-danger'
//                   style={{ padding: '2px 2px 0px' }}
//                 >
//                   <IoIosClose
//                     className='cursor-pointer'
//                     onClick={() => actionForCartItem('delete', item)}
//                     style={{ fontSize: '30px' }}
//                   />
//                 </div>
//                 <div
//                   className='d-flex justify-content-between align-items-center'
//                   style={{ padding: '0 3rem 1rem 1rem' }}
//                 >
//                   <div className='d-flex align-items-center gap-1rem'>
//                     <Image
//                       src={item.image_url}
//                       alt={item.title}
//                       thumbnail
//                       width='60'
//                       className='mr-3'
//                     />
//                     <div>
//                       <div>{item.title}</div>
//                     </div>
//                   </div>
//                   <div className='d-flex align-items-center gap-1rem'>
//                     <div className='flex-column align-items-center justify-center'>
//                       <div className='d-flex align-items-center gap-1rem cart-quantity'>
//                         <CiSquareMinus
//                           className='text-warning cart-icon'
//                           onClick={() => {
//                             actionForCartItem('decrement', item);
//                           }}
//                         />
//                         <span>{item.quantity}</span>
//                         <CiSquarePlus
//                           className='text-warning cart-icon'
//                           onClick={() => {
//                             actionForCartItem('increment', item);
//                           }}
//                         />
//                       </div>
//                       <div className='text-center cart-subtotal'>
//                         <small>${item.subTotal.toLocaleString('es-CL')}</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//         <div className='width-100-percent d-flex justify-end text-warning'>
//           <div
//             className={`display-flex justify-${
//               currentCart.products.length > 0 ? 'between' : 'end'
//             } align-items-center width-100-percent`}
//           >
//             {currentCart.products.length > 0 && (
//               <Button
//                 variant='danger'
//                 className='d-flex btn btn-xs gap-05rem'
//                 onClick={() => {
//                   actionForCartItem('clear');
//                 }}
//               >
//                 <FaRegTrashAlt />
//                 Limpiar carrito
//               </Button>
//             )}
//             <span className='h5 display'>
//               ${currentCart.totalCart.toLocaleString('es-CL')}
//             </span>
//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button
//           variant='outline-light'
//           onClick={handleCloseCart}
//           className='modal-btn-cancel'
//         >
//           Cerrar
//         </Button>
//         <Button
//           variant='outline-warning'
//           onClick={() => {
//             handleCreateTransaction(token);
//             handleGetCartItems(token, user.id);
//             handleCloseCart();
//             toast.success(
//               'Transacción generada con éxito. Gracias por preferirnos!',
//               { position: 'top-right' }
//             );
//           }}
//           className='modal-btn-submit'
//           disabled={currentCart.products.length == 0}
//         >
//           Realizar Compra
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default TransactionModal;
