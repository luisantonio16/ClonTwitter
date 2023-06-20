import React from 'react'

export const EditarUsuario = () => {
  return (
    <section className='editar'>
        <div className='editar-container'>
            {/* Aqui vai o formulário */}
            <form className='form'>
                <div className="Cotent-text">
                       <h2 className='editar-titulo'>Editar Perfil</h2>
                </div>

                <div className="Cotent-text">
                    <input type="text" placeholder="Nombre" name="nombre" className='form-items'  />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="Apellido" name="apellido" className='form-items' />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="Usuario" name="Usuario" className='form-items' />
                </div>
                <div className="Cotent-text">
                    <input type="text" placeholder="email" name="Email" className='form-items' />
                </div>
                <div className="Cotent-text">
                    <input type="password" placeholder="Contraseña" name="Contraseña" className='form-items' />
                </div>
                <div className="Cotent-text">
                    <label htmlFor="imagen">imagen de perfil</label>
                    <div className="avatar">
                          {/* Mostrar Imagenes */}
                    </div>
                    <input type="file" name='file0' id="file"/>
                </div>
                <div className="Cotent-text">
                    <input type="submit" className='form-item-btn'  />
                </div>

            </form>
        </div>

    </section>
  )
}
