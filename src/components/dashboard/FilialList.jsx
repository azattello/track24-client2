import React, { useEffect, useState } from "react";
import './css/admin.css';
import { addFilial, getFilials } from '../../action/filial';
// import { deleteFilial } from '../../action/filial';
// import trash from "../../assets/img/trash.png"

const FilialList = () => {
    const [filialText, setFilialText] = useState(''); // Состояние для текста филиала
    const [filialId, setFilialId] = useState(''); // Состояние для текста филиала
    const [filialAddress, setFilialAddress] = useState(''); // Состояние для текста филиала
    const [userPhone, setUserPhone] = useState(''); // Состояние для номера телефона пользователя
    const [filials, setFilials] = useState([]); // Состояние для списка филиалов

         // Функция для получения данных о филиалах при загрузке компонента
         useEffect(() => {

      
          fetchFilials(); // Вызываем функцию получения данных о филиалах при загрузке компонента
        }, []);

  
        const fetchFilials = async () => {
          // Вызываем функцию getFilials для получения данных о всех филиалах
          const allFilials = await getFilials();
          setFilials(allFilials); // Обновляем список филиалов
        };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы по умолчанию

    try {
      // Вызываем функцию addFilial с введенными данными филиала
      const response = await addFilial(filialId, filialText, userPhone, filialAddress);
      console.log('Новый карго успешно добавлен:', response);
      // Очищаем поля ввода после успешного добавления
      setFilialText('');
      setUserPhone('');
      setFilialId('');
      setFilialAddress('');
      // Получаем обновленные данные о филиалах после добавления нового филиала
      const updatedFilials = await getFilials();
      setFilials(updatedFilials); // Обновляем список филиалов
    } catch (error) {
      console.error('Ошибка при добавлении филиала:', error);
    }
  };

  // const handleDeleteFilial = async (filialId) => {
  //   const isConfirmed = window.confirm('Вы уверены, что хотите удалить этот филиал?');
  //   if (!isConfirmed) {
  //       return; // Если пользователь отменил действие, выходим из функции
  //   }
  //   try {
  //     const message = await deleteFilial(filialId);
  //     console.log(message);
  //     // После успешного удаления филиала обновляем список филиалов
  //     const updatedFilials = filials.filter(filial => filial._id !== filialId);
  //     setFilials(updatedFilials);
      
  //     fetchFilials();
  //   } catch (error) {
  //     console.error('Ошибка при удалении филиала:', error);
  //   }
  // };


        
  return (
      <div className="status-list">
        <h1 className="status-list-title">Добавить карго</h1>

        <form className="form-filialAdd" onSubmit={handleSubmit}>
          <input 
            className="input-filialAdd"
            type="text"
            value={filialText}
            onChange={(e) => setFilialText(e.target.value)}
            placeholder="Введите наименование карго"
          />
          <input
            className="input-filialAdd"
            type="text"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="Введите номер телефона владельца"
          />
           <input
            className="input-filialAdd"
            type="text"
            value={filialId}
            onChange={(e) => setFilialId(e.target.value)}
            placeholder="Введите id карго"
          />
          <input
            className="input-filialAdd"
            type="text"
            value={filialAddress}
            onChange={(e) => setFilialAddress(e.target.value)}
            placeholder="Введите адрес карго или город"
          />
          <button className="filialAdd-button" type="submit">Добавить карго</button>
        </form>
        
        <ul>
          {filials.map((filial) => (
            <div className="filial-el" key={filial.filial._id}>
                  <p>Название карго: {filial.filial.filialText} <br /> Владелец: {filial.filial.userPhone} <br /> Адрес карго: {filial.filial.filialAddress} <br /> ID карго: {filial.filial.filialId}</p>
                  {/* <img src={trash} alt="" className="trash" onClick={() => handleDeleteFilial (filial.filial._id)}/> */}
            </div>

          ))}
        </ul>
        

          
      </div>
  );
}


export default FilialList;