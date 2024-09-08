import { useMutation } from "@apollo/client";
import axios from "axios";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Close, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  ButtonGroup,
  Stack,
  Container,
  Grid,
  Box,
  Backdrop,
  Link,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import CreateMarkerMinadarMutation from "../../graphql/mutations/createMarkerMindar";
import uploadFileToBlob from "../azure-storage-blob";
import { NimitrTextField } from "../ui/text-field";

import { Compiler } from "./image-target/compiler";

import { useTranslation } from "react-i18next";
import DialogMessage from "../manage-project-page/dialog-Alert-fileSize";

const initialMindMarkerState = {
  markerType: "mindar",
  markerPattern: "",
  markerUrl: "",
};

const CompilerComponent = ({ status, refetch, onCloseDialog, projectId, quser }) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [mindSelected, setMindSelected] = useState(null);
  const [mindfile, setMindfile] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isUploadButtonDisabled, setUploadButtonDisabled] = useState(false);
  const [contentMindMarkerState, setContentMindMarkerState] = useState({
    markerName: "",
    ...initialMindMarkerState,
  });

  const [createMarkerMinadarMutation] = useMutation(CreateMarkerMinadarMutation);

  const compiler = new Compiler();

  const showData = (data) => {
    // console.log('data', data)
  };

  const refreshPage = () => {
    refetch();
    onCloseDialog();
  };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert blob to base64"));
        }
      };
      reader.readAsDataURL(blob);
    });
  };

  // Helper function to upload media
  const uploadMedia = async (media, type, userId) => {
    const response = await axios.post("http://localhost:8000/uploadmedia", {
      media,
      type,
      id: userId,
    });
    return response.data.url;
  };

  // Function to convert Blob to File
  const blobToFile = (blob, filename) => {
    return new File([blob], filename, { type: blob.type });
  };

  // Function to handle file compilation and uploading
  const compileFiles = async () => {
    if (!mindSelected) {
      console.log("Please upload a file");
      return;
    }

    try {
      // Load and compile the image
      const image = await loadImage(mindSelected);
      const startTime = new Date().getTime();

      const dataList = await compiler.compileImageTargets([image], (progress) => {
        setProgress(progress);
      });

      // Display compiled data
      dataList.forEach((data) => showData(data));

      // Export compiled data and convert to Blob
      const exportedBuffer = await compiler.exportData();
      const blob = new Blob([exportedBuffer], { type: "model/gltf-binary" }); // Correct MIME type for .glb files

      // Convert Blob to File with a .glb extension
      const file = blobToFile(blob, "compiledModel.glb");

      // Convert the mindSelected file to Base64
      const base64String = await convertBlobToBase64(mindSelected);

      // Upload media and compiled model
      const mediaUrl = await uploadMedia(base64String, mindSelected.type.split("/")[1], quser?._id);
      const compiledUrl = await uploadMedia(await convertBlobToBase64(file), "glb", quser?._id);

      console.log("🚀 ~ compiledUrl:", compiledUrl);

      // Create a marker
      const { data: responseMarkerContent } = await createMarkerMinadarMutation({
        variables: {
          projectId: `${projectId}`,
          name: contentMindMarkerState?.markerName,
          markerUrl: mediaUrl,
          markerPattern: compiledUrl,
          markerType: "mindar",
        },
      });

      if (responseMarkerContent) {
        refreshPage();
        setContentMindMarkerState({ markerName: "" });
        setProgress(0);
        setMindSelected(null);
      } else {
        console.log("Error creating marker content");
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };
  const loadImage = async (File) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(File);
    });

  const handleChangeStateValue = (event) => {
    const { name, value } = event.target;
    setContentMindMarkerState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setMindfile([]);
    setContentMindMarkerState({
      markerName: "",
    });
    setProgress(0);
    setMindSelected(null);
  };

  const handleStartButtonClick = async () => {
    if (!contentMindMarkerState.markerName || !mindSelected) {
      // console.log('Please enter a marker name and upload a file')
      return;
    }
    setUploadButtonDisabled(true);
    compileFiles();
  };

  const updateMindfile = (newMindFile) => {
    if (newMindFile.length > 0) {
      const allowedFileTypes = [".png", ".jpg", ".jpeg"];
      const selectedFileType = newMindFile[0].file.name.slice(-4).toLowerCase();

      if (allowedFileTypes.includes(selectedFileType)) {
        // เฉพาะไฟล์ .png, .jpg, .jpeg ถูกเลือก
        if (newMindFile.length <= 1) {
          // ตรวจสอบว่าไม่มีไฟล์มากกว่า 1 ไฟล์
          setMindfile(newMindFile);
          if (newMindFile.length > 0) {
            setMindSelected(newMindFile[0].file);
          }
        } else {
          // ถ้ามีไฟล์มากกว่า 1 ไฟล์
          setMindfile([newMindFile[0]]); // เซ็ตเฉพาะไฟล์แรกที่ถูกเลือก
          setMindSelected(newMindFile[0].file);
        }
      } else {
        setDialogMessage(t("content_list.title_p23"));
        setMindfile([]);
        setOpenDialog(true);
      }
    } else {
      // ถ้าไม่มีไฟล์ถูกเลือก
      setMindfile([]);
    }
  };

  const renderImageUpload = () => (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "20px" },
            }}
          >
            {t("content_list.title_marker_compiler")}
          </Typography>
          <IconButton onClick={refreshPage}>
            <Close />
          </IconButton>
        </Box>
        <Typography sx={{ fontWeight: 700, color: "red", fontSize: { xs: "12px" } }}>
          {t("content_list.title_p9")}
          <Link
            href="https://help.scoot.app/how-do-i-enable-my-browsers-hardware-acceleration"
            target="_blank"
            underline="always"
            sx={{ color: "red", fontWeight: 700 }}
          >
            {t("content_list.title_p10")}
          </Link>
        </Typography>
        <Divider variant="middle" style={{ height: "1px" }} />
        <Typography sx={{ fontWeight: 700 }}>{t("content_diglog_create_edit.title_p5")}</Typography>
        <NimitrTextField
          required
          placeholder={t("marker_dialog_create_edit.title_placeholder1")}
          id="markerName"
          name="markerName"
          value={contentMindMarkerState.markerName}
          onChange={handleChangeStateValue}
        />
        <Grid xs={12} sx={{ p: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>{t("filelimitbody_compo.title_p1")}</Typography>

          <Dropzone
            required
            onChange={updateMindfile}
            style={{ width: "100%" }}
            value={mindfile}
            accept=".png, .jpg, .jpeg"
            height="auto"
            disableScroll
            maxFiles={1}
            view="grid"
          >
            {mindfile.length > 0 ? (
              mindfile.map((mfile) => <FileItem {...mfile} key={mfile.id} preview />)
            ) : (
              <Typography sx={{ textAlign: "center", fontWeight: 700 }}>
                {t("content_diglog_create_edit.title_p6")}
              </Typography>
            )}
          </Dropzone>
        </Grid>
        <Grid container xs={12} sx={{ p: 1 }}>
          <Grid item xs={12} sm={6} sx={{ pr: { xs: 0, sm: 1 }, pb: { xs: 1, sm: 0 } }}>
            <ButtonGroup fullWidth variant="contained">
              <Button
                startIcon={<CloudUploadIcon />}
                onClick={handleStartButtonClick}
                disabled={isUploadButtonDisabled}
              >
                {t("content_list.title_upload")}
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ pl: { xs: 0, sm: 1 } }}>
            <ButtonGroup fullWidth variant="contained">
              <Button startIcon={<BackspaceIcon />} onClick={handleClear} disabled={isUploadButtonDisabled}>
                {t("content_list.title_clear")}
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );

  const renderContent = () => {
    if (mindfile.length > 0 && progress > 0) {
      return (
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: "#FFD102",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          open={progress}
        >
          <CircularProgress variant="determinate" value={progress} size={100} />
        </Backdrop>
      );
    }
  };

  return (
    <>
      <Dialog
        open={status}
        keepMounted
        maxWidth="sm"
        fullWidth
        sx={{
          "@media (max-width: 600px)": {
            "& .MuiDialog-paper": {
              margin: "0",
              maxHeight: "80%",
            },
          },
        }}
      >
        <DialogContent>
          <Grid container sx={{ justifyContent: "center", display: "flex" }}>
            {renderImageUpload()}
            {renderContent()}
          </Grid>
        </DialogContent>
      </Dialog>
      <DialogMessage open={openDialog} onClose={handleCloseDialog} message={dialogMessage} />
    </>
  );
};

CompilerComponent.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
  projectId: PropTypes.string,
};

CompilerComponent.defaultProps = {
  status: false,
  onCloseDialog: () => {},
  refetch: () => {},
  projectId: "",
};

export default CompilerComponent;
