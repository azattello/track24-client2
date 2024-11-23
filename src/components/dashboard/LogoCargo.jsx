import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { getFilialByUserPhone  } from "../../action/filial"; // Импортируем getFilials для получения списка филиалов
import { getUserProfile  } from "../../action/user"; // Импортируем getFilials для получения списка филиалов

const Banners = () => {
  const [logo, setLogo] = useState(null);
  const [filialId, setFilialId] = useState(null);

  // Получение данных филиала и логотипа
  useEffect(() => {
    const fetchFilialData = async () => {
      try {
        // Получаем профиль пользователя
        const user = await getUserProfile();
        if (user?.phone) {
          // Ищем филиал по номеру телефона
          const filial = await getFilialByUserPhone(user.phone);
          if (filial?.filialId) {
            setFilialId(filial.filialId); // Устанавливаем ID филиала
            // Получаем логотип
            const response = await axios.get(`${config.apiUrl}/api/upload/getLogo`, {
              params: { filialId: filial.filialId },
            });
            setLogo(response.data.logoPath || null);
          }
        }
      } catch (error) {
        console.error("Ошибка при получении данных филиала:", error);
      }
    };

    fetchFilialData();
  }, []);

  const handleLogoUpload = () => {
    if (!filialId) {
      console.error("Не удалось загрузить логотип: отсутствует ID филиала");
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("logo", file);
        formData.append("filialId", filialId);

        try {
          const response = await axios.post(`${config.apiUrl}/api/upload/uploadLogo`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setLogo(response.data.logoPath); // Обновляем состояние
        } catch (error) {
          console.error("Ошибка при загрузке логотипа:", error);
        }
      }
    };

    input.click();
  };

  const handleDeleteLogo = async () => {
    if (!filialId) {
      console.error("Не удалось удалить логотип: отсутствует ID филиала");
      return;
    }

    try {
      await axios.delete(`${config.apiUrl}/api/upload/deleteLogo`, {
        data: { filialId },
      });
      setLogo(null); // Удаляем из состояния
    } catch (error) {
      console.error("Ошибка при удалении логотипа:", error);
    }
  };

  return (
    <div className="banner-list">
      <h2 className="status-list-title">Логотип</h2>
      <div
        className="banner"
        style={{ position: "relative", cursor: "pointer" }}
        onClick={handleLogoUpload}
      >
        {logo ? (
          <>
            <img
              src={`${config.apiUrl}${logo}`}
              alt="Логотип"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteLogo();
              }}
              style={{
                position: "absolute",
                bottom: "5px",
                left: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Удалить
            </button>
          </>
        ) : (
          <span>Загрузить логотип</span>
        )}
      </div>
    </div>
  );
};

export default Banners;
