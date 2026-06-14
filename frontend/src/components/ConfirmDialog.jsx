
import React from 'react';

function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay">
            <div className="modal modal-confirm">
                <h2>Confirmation</h2>
                <p>{message}</p>

                <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Annuler
                    </button>
                    <button type="button" className="btn btn-danger" onClick={onConfirm}>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;
