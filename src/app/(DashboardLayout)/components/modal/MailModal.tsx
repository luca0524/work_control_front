"use client"; // Required for Next.js App Router

import { forwardRef, ReactElement, Ref } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Fade, { FadeProps } from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

// Props Interface
interface RoomModalProp {
  show: boolean;
  setShow: (value: boolean) => void;
  mail?: { Subject?: string; Body?: string }; // Optional mail
}

// Transition Component
const Transition = forwardRef(
  (props: FadeProps & { children?: ReactElement }, ref: Ref<HTMLDivElement>) => (
    <Fade ref={ref} {...props} timeout={500} />
  )
);

const MailModal = ({ show, setShow, mail }: RoomModalProp) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<any>(null);  

  useEffect(() => {
    if(mail){
      setLoading(true);
      setContent(mail.Body ?? "No content avalabl");
      setLoading(false);
    }
  })
  if (!mail) return null; // Prevents hydration issues if `mail` is undefined
  
  return (
    <Dialog open={show} onClose={() => setShow(false)} TransitionComponent={Transition} maxWidth="lg" fullWidth>
      <DialogContent>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 , textAlign: "center"}}>
          <Typography variant="h5" sx={{ fontWeight: "bold" , textAlign: "center"}}>{mail.Subject || "No Subject"}</Typography>
          <IconButton onClick={() => setShow(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Body */}
        {loading ? <CircularProgress /> : <div dangerouslySetInnerHTML={{ __html: content }} />}

        {/* Footer Actions */}
        <DialogActions>
          <Button variant="contained" onClick={() => setShow(false)}>
            Close
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default MailModal;
