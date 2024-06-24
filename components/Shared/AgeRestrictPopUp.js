import React, { useState } from "react";
import {useSession} from 'next-auth/react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AgeRestrictPopUp = () => {
    const {status, data } = useSession();
    const [open, setOpen] = useState(true);

    if (status === 'unauthenticated') {
        const handleClose = (
            event,
            reason
        ) => {
            if (reason === "backdropClick" || reason === "escapeKeyDown") {
                console.warn(reason);
            } else {
                setOpen(false);
            }
        };
        return (
            <Dialog
                PaperProps={{
                        style: {
                            opacity: '1',
                            backgroundImage: "url(/images/loader-bg.webp)",
                            backgroundColor: 'opacity',
                            boxShadow: '100%',
                            height: '55%',
                            padding: '100px 50px 10px 50px',
                        },
                    }}
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle className="page-title-content">
                     Welcome To Cloud 9 Smoke Shop
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="section-title" >
                        <span className="sub-title">Hey there, Are you at least 21 years of age?</span>
                    </DialogContentText>
                </DialogContent>
                <div className="dialog-action">
                    <DialogActions>
                        <a href="https://teen.smokefree.gov/" className="default-btn"> No <span></span></a>
                        <button className="default-btn" onClick={handleClose}>I am 21+<span></span></button>
                    </DialogActions>
                </div>
            </Dialog>

        );
    }

    return (
        <>
        </>
    )
}

export default AgeRestrictPopUp;