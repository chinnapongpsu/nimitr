import axios from "axios";
import { useMutation } from "@apollo/client";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Visibility, Close, Publish } from "@mui/icons-material";
import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  Slider,
  useTheme,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import UpdateContentMutation from "../../graphql/mutations/updateContent";
import UpdateMediaMutation from "../../graphql/mutations/updateMedia";
import { LinearProgressWithLabel } from "../progress";
import { NimitrTextField } from "../ui/text-field";

import SoundCheckbox from "./SoundCheckbox";
import CustomBackdrop from "../ui/BackdropProgress";
import StillCheckbox from "./StillCheckbox";

import DialogMessage from "./dialog-Alert-fileSize";
import SwitchButtonFileDropzone from "./SwitchButtonFileDropzone";

const initialContentMediaState = {
  mediaName: "",
  mediaType: "",
  mediaUrl: "",
  soundURL: "",
};

const ContentDialogEdit = ({
  recommendFileVideo,
  recommendFileModel,
  status,
  quser,
  onCloseDialog,
  refetch,
  contentUpdateState,
  setContentUpdateState,
  handleOpenPreviewMedia,
  content,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [fileSelected, setFileSelected] = useState();
  const [, setFileUploaded] = useState("");
  const [uploading, setUploading] = useState(false);
  const [, setInputKey] = useState(Math.random().toString(36));

  const buttonText = uploading
    ? t("content_diglog_create_edit.title_uploading")
    : t("content_diglog_create_edit.title_submit");

  const [contentMediaState, setContentMediaState] = useState(initialContentMediaState);
  const [progress, setProgress] = useState(0);
  const [onProgressStatus, setOnProgressStatus] = useState(false);

  const [updateContentMutation] = useMutation(UpdateContentMutation);
  const [updateMediaMutation] = useMutation(UpdateMediaMutation);

  const [mediaFile, setMediaFile] = useState([]);
  const onDeleteMediaFile = (id) => {
    setProgress();
    setOnProgressStatus(false);
    setMediaFile(mediaFile.filter((x) => x.id !== id));
  };

  // const onDeleteSoundFile = (id) => {
  //   setSoundFile(soundFile.filter((x) => x.id !== id))
  // }

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedSwitch, setIsCheckedSwitch] = useState(false);
  const [soundFile, setSoundFile] = useState([]);
  const [soundSelected, setSoundSelected] = useState();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSwitchChange = (event) => {
    setIsCheckedSwitch(event.target.checked);
  };
  const handleCheckboxStillChange = (e) => {
    setContentUpdateState({
      ...contentUpdateState,
      still: e.target.checked,
    });
  };

  const handleChangeStateValue = (e) => {
    setContentUpdateState({
      ...contentUpdateState,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmbeddedValue = (e) => {
    setContentMediaState({
      ...contentMediaState,
      [e.target.name]: e.target.value,
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogSoundLimit, setOpenDialogSoundLimit] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMediaFile([]);
  };
  const handleCloseDialogSoundLimit = () => {
    setOpenDialogSoundLimit(false);
    setSoundFile([]);
  };

  // const updatesoundfile = (newSoundFile) => {
  //   if (newSoundFile.length !== 0) {
  //     const selectedFile = newSoundFile[0].file

  //     const maxSizeInMB = quser?.maxsizeaudio
  //     const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  //     if (selectedFile.size > maxSizeInBytes) {
  //       setSoundFile([])
  //       setDialogMessage(`${t('content_list.title_p11')} ${maxSizeInMB} MB`)
  //       setOpenDialog(true)
  //     } else {
  //       setSoundFile(newSoundFile)
  //       setSoundSelected(selectedFile)
  //     }
  //   }
  // }
  const updatesoundfile = (newSoundFile) => {
    setSoundFile(newSoundFile);
    if (newSoundFile.length !== 0) {
      const selectedFile = newSoundFile[0].file;

      const maxSizeInMB = quser?.maxsizeaudio;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        setSoundFile([]);
        setDialogMessage(`${t("content_list.title_p11")} ${maxSizeInMB} MB`);
        setOpenDialogSoundLimit(true);
      } else {
        setSoundFile(newSoundFile);
        setSoundSelected(selectedFile);
      }
    }
  };

  const updateMediaFile = (incomingFiles) => {
    if (incomingFiles.length === 0) {
      setMediaFile(incomingFiles);
      return;
    }
    let allowedExtensions = [];

    if (contentUpdateState.media.type === "modal") {
      allowedExtensions = [".glb"];
    } else if (contentUpdateState.media.type === "video") {
      allowedExtensions = [".mp4", ".mov"];
    } else if (contentUpdateState.media.type === "embedded") {
      allowedExtensions = [".mp4"];
    }

    const maxSizeInMB =
      contentUpdateState.media.type === "modal"
        ? quser?.maxsizemodel
        : contentUpdateState.media.type === "video"
        ? quser?.maxsizevideo
        : contentUpdateState.media.type === "embedded"
        ? quser?.maxsizevideo
        : 0;

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const fileSelected = incomingFiles[0].file;

    const fileExtension = fileSelected.name.substr(fileSelected.name.lastIndexOf(".")).toLowerCase();

    if (fileSelected.size > maxSizeInBytes) {
      setDialogMessage(`${t("content_list.title_p11")} ${maxSizeInMB} MB`);
      setOpenDialog(true);
    } else if (!allowedExtensions.includes(fileExtension)) {
      setDialogMessage(t("content_list.title_p23"));
      setMediaFile([]);
      setOpenDialog(true);
    } else {
      setMediaFile(incomingFiles);
      setFileSelected(fileSelected);
      setContentMediaState({
        ...contentMediaState,
        mediaName: fileSelected.name,
        mediaType: contentMediaState.mediaType,
      });
    }
  };

  const uploadMediaUrl = process.env.REACT_APP_UPLOAD_MEDIA;

  const uploadMedia = async (file, type) => {
    try {
      const base64 = await fileToBase64(file);
      const fileExtension = file.name.split(".").pop();

      // Extract the file name from the media URL
      const mediaUrl = contentUpdateState?.media?.mediaUrl;
      const url = new URL(mediaUrl);
      const fileName = url.pathname.split("/").pop();

      const response = await axios.put(uploadMediaUrl, {
        media: base64,
        type: fileExtension,
        id: quser?._id,
        filename: fileName, // Use the extracted file name
      });
        console.log("🚀 ~ uploadMedia ~ fileName:", fileName)

      return response.data.url;
    } catch (error) {
      console.error("Media upload failed:", error);
      return null;
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitUpdateContent = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const typeContainer = contentMediaState?.mediaType || "modal";

      const response = await uploadMedia(fileSelected);

      const responseEmbedded =
        contentUpdateState?.media?.type === "embedded" &&
        mediaFile?.length !== 0 &&
        (await uploadMedia(fileSelected, "video"));

      const responsesound = await uploadMedia(soundSelected, "audio"); // Specify type if needed

      const typeContainerEmbedded = contentUpdateState?.media?.type === "embedded";
      const iframeVideoUrl = `
      <video style="width: 80%; height: auto; max-width: 100%; max-height: 60%;" controls>
        <source src="${responseEmbedded}" type="video/mp4">
      </video>
    `;

      if (fileSelected && fileSelected?.name) {
        if (response) {
          const { data: responseUpdateContent } = await updateContentMutation({
            variables: {
              id: contentUpdateState?.contentId,
              name: contentUpdateState?.name,
              scale: contentUpdateState?.scale,
              rotationX: contentUpdateState?.rotationX,
              rotationY: contentUpdateState?.rotationY,
              rotationZ: contentUpdateState?.rotationZ,
            },
          });

          if (responseUpdateContent) {
            const { data: responseUpdateMedia } = await updateMediaMutation({
              variables: {
                id: contentUpdateState?.media?._id,
                name: contentMediaState?.mediaName,
                mediaUrl: responseEmbedded ? iframeVideoUrl : response,
                soundURL: responsesound,
                still: contentUpdateState?.still,
              },
            });

            if (responseUpdateMedia) {
              setFileSelected(null);
              setFileUploaded(fileSelected.name);
              setUploading(false);
              setInputKey(Math.random().toString(36));
            }
          }
        }
      } else {
        const { data: responseUpdateContent } = await updateContentMutation({
          variables: {
            id: contentUpdateState?.contentId,
            name: contentUpdateState?.name,
            scale: contentUpdateState?.scale,
            rotationX: contentUpdateState?.rotationX,
            rotationY: contentUpdateState?.rotationY,
            rotationZ: contentUpdateState?.rotationZ,
          },
        });

        if (responseUpdateContent) {
          if (contentMediaState?.mediaUrl === "") {
            const mediaName = contentMediaState?.mediaName || contentUpdateState?.media?.name;
            await updateMediaMutation({
              variables: {
                id: contentUpdateState?.media?._id,
                name: mediaName,
                still: contentUpdateState?.still,
              },
            });
          } else if (typeContainerEmbedded) {
            await updateMediaMutation({
              variables: {
                id: contentUpdateState?.media?._id,
                name: contentMediaState?.mediaName,
                mediaUrl: contentMediaState?.mediaUrl,
                still: true,
              },
            });
          }

          setFileSelected(null);
          setUploading(false);
          setInputKey(Math.random().toString(36));
        }
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
    handleRefresh();
  };
  const handleRefresh = () => {
    setMediaFile([]);
    setContentMediaState(initialContentMediaState);
    setProgress(0);
    setOnProgressStatus(false);
    refetch();
    onCloseDialog();
  };

  const UpdateFileSizeWarning = () => {
    if (contentUpdateState?.media?.type === "modal") {
      if (mediaFile.length === 0) {
        return (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: "red",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              {t("content_list.title_p11")} {quser?.maxsizemodel}MB
            </Typography>
            {recommendFileModel()}
          </>
        );
      }
    } else if (contentUpdateState?.media?.type === "video" || "embedded") {
      if (mediaFile.length === 0) {
        const maxsizevideoMB = quser?.maxsizevideo;
        const maxsizevideoGB = maxsizevideoMB < 1024 ? maxsizevideoMB + "MB" : maxsizevideoMB / 1024 + "GB";

        return (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: "red",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              {t("content_list.title_p11")} {maxsizevideoGB}
            </Typography>
            {recommendFileVideo()}
          </>
        );
      }
    }
    return null;
  };

  return (
    <>
      <Dialog
        PaperProps={{
          sx: {
            p: 2,
          },
        }}
        open={status}
        keepMounted
        maxWidth="md"
      >
        <CustomBackdrop open={uploading} />

        <form onSubmit={handleSubmitUpdateContent}>
          {/* ส่วนหัวของ Dialog */}
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {t("content_diglog_create_edit.title_head1")}
            </Typography>
            <IconButton onClick={onCloseDialog}>
              <Close />
            </IconButton>
          </DialogTitle>

          {/* ส่วนเนื้อหาของ Dialog */}
          <DialogContent>
            {/* ส่วนแบ่งคอนเทนเนอร์ */}
            <Grid container>
              {/* ชื่อเนื้อหา */}
              <Grid item xs={12} sx={{ p: 1 }}>
                <NimitrTextField
                  margin="normal"
                  required
                  placeholder={t("content_diglog_create_edit.title_p1")}
                  id="name"
                  name="name"
                  value={contentUpdateState?.name}
                  onChange={handleChangeStateValue}
                  sx={{
                    "&.MuiFormControl-root": {
                      mt: 0,
                      width: "100%",
                    },
                  }}
                />
              </Grid>

              {/* รูปภาพเครื่องหมาย */}
              <Grid item xs={12} md={6} sx={{ p: { xs: 0, sm: 2 } }}>
                <Typography>{t("content_diglog_create_edit.title_head2")}</Typography>
                <Stack spacing={1} direction="column" sx={{ alignItems: "center", mt: 2 }}>
                  <Box
                    component="img"
                    src={contentUpdateState?.markerUrl}
                    sx={{
                      p: 1,
                      width: "100%",
                      height: "auto",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "10px",
                    }}
                  />
                  <Typography>{contentUpdateState?.markerName}</Typography>
                </Stack>
              </Grid>

              {/* ประเภทของเนื้อหา */}
              <Grid xs={12} md={6} sx={{ p: { xs: 0, sm: 2 } }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    fontWeight: 700,
                  }}
                >
                  <Typography>{t("content_diglog_create_edit.title_p3")}</Typography>
                  <IconButton
                    onClick={() => {
                      handleOpenPreviewMedia(
                        contentUpdateState?.media?.mediaUrl,
                        contentUpdateState?.media?.name,
                        contentUpdateState?.media?.type,
                        contentUpdateState?.scale,
                        [contentUpdateState?.rotationX, contentUpdateState?.rotationY, contentUpdateState?.rotationZ]
                      );
                    }}
                  >
                    <Visibility />
                  </IconButton>
                </Stack>
                {contentUpdateState?.media?.type === "modal" ? (
                  <>
                    {/* Dropzone สำหรับไฟล์ .glb */}
                    <Dropzone
                      onChange={updateMediaFile}
                      value={mediaFile}
                      width="100%"
                      required
                      accept=".glb"
                      height="auto"
                      maxFiles="1"
                      disableScroll
                      view="grid"
                    >
                      {UpdateFileSizeWarning()}
                      {mediaFile.map((file) => (
                        <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                      ))}
                    </Dropzone>

                    {/* เช็คบ็อกซ์สำหรับเสียง */}
                    {mediaFile.length > 0 && (
                      <Box>
                        <Stack>
                          <SoundCheckbox
                            t={t}
                            quser={quser}
                            isChecked={isChecked}
                            handleCheckboxChange={handleCheckboxChange}
                            updatesoundfile={updatesoundfile}
                            // onDeleteSoundFile={onDeleteSoundFile}
                            soundFile={soundFile}
                          />
                        </Stack>
                      </Box>
                    )}
                  </>
                ) : null}
                {contentUpdateState?.media?.type === "video" ? (
                  <Dropzone
                    onChange={updateMediaFile}
                    value={mediaFile}
                    width="100%"
                    required
                    accept=".mp4,.mov"
                    minHeight="195px"
                    maxFiles="1"
                    disableScroll
                    view="grid"
                  >
                    {UpdateFileSizeWarning()}
                    {mediaFile.map((file) => (
                      <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                    ))}
                  </Dropzone>
                ) : null}
                {contentUpdateState?.media?.type === "embedded" && (
                  <>
                    <SwitchButtonFileDropzone
                      t={t}
                      SwitchButtonFileDropzone={isCheckedSwitch}
                      handleSwitchFileDropzoneChange={handleSwitchChange}
                    />
                    {isCheckedSwitch ? (
                      <Dropzone
                        onChange={updateMediaFile}
                        value={mediaFile}
                        width="100%"
                        required
                        accept=".mp4"
                        height="auto"
                        maxFiles="1"
                        disableScroll
                        view="grid"
                      >
                        {/* แสดง Typography เฉพาะเมื่อไม่มีไฟล์เข้าใน Dropzone */}
                        {UpdateFileSizeWarning()}
                        {mediaFile.map((file) => (
                          <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                        ))}
                      </Dropzone>
                    ) : (
                      <>
                        <Typography sx={{ fontWeight: 700, mt: 2 }}>
                          {t("marker_dialog_create_edit.title_p3")}
                        </Typography>
                        <NimitrTextField
                          margin="normal"
                          required
                          id="name"
                          name="mediaName"
                          placeholder={t("content_list.title_p20")}
                          value={contentMediaState?.mediaName}
                          onChange={handleEmbeddedValue}
                          sx={{
                            width: "100%",
                            mt: 1,
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ fontWeight: 700 }}>{t("content_list.title_p19")}</Typography>
                          <Link
                            href="https://help.qwilr.com/article/333-embedding-google-slides?fbclid=IwAR24WikpQTH5X4MNTsz3-zED4zzPO_j9QeMgv9t9bgjTHwMf4bacJWr7k88"
                            target="_blank"
                            sx={{
                              color: theme.palette.primary.black,
                              fontWeight: 700,
                              textDecoration: "underline",
                            }}
                          >
                            {t("content_list.title_p21")}
                          </Link>
                        </Box>
                        <NimitrTextField
                          margin="normal"
                          required
                          id="name"
                          name="mediaUrl"
                          placeholder={t("content_list.title_p18")}
                          value={contentMediaState?.mediaUrl}
                          onChange={handleEmbeddedValue}
                          sx={{
                            width: "100%",
                          }}
                          multiline
                          variant="filled"
                        />
                      </>
                    )}
                    {/* <StillCheckbox
                        t={t}
                        isCheckedStill={true}
                        handleCheckboxStillChange={handleCheckboxStillChange}
                      /> */}
                  </>
                )}
                {!progress ? null : <LinearProgressWithLabel value={progress} />}
                {!mediaFile?.length ? null : (
                  <NimitrTextField
                    required
                    margin="normal"
                    placeholder="กรุณาใส่ชื่อ Media"
                    value={contentMediaState?.mediaName}
                    onChange={(e) => {
                      setContentMediaState({
                        ...contentMediaState,
                        mediaName: e.target.value,
                      });
                    }}
                    sx={{
                      "&.MuiFormControl-root": {
                        mt: 0,
                        width: "100%",
                      },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">File:</InputAdornment>,
                    }}
                  />
                )}
              </Grid>

              {/* ขนาดและการหมุน */}
              {contentUpdateState?.media?.type === "embedded" ? null : (
                <Grid item xs={12} sx={{ p: 1 }}>
                  <Box>
                    <StillCheckbox
                      t={t}
                      isCheckedStill={!!contentUpdateState?.still}
                      handleCheckboxStillChange={handleCheckboxStillChange}
                    />
                    <Typography sx={{ fontWeight: 700 }}>{t("content_diglog_create_edit.title_scale")}</Typography>
                    <Slider
                      value={typeof contentUpdateState?.scale === "number" ? contentUpdateState?.scale : 0.1}
                      id="scale"
                      name="scale"
                      onChange={handleChangeStateValue}
                      step={0.1}
                      min={0.1}
                      max={3}
                      valueLabelDisplay="auto"
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>{t("content_diglog_create_edit.title_rotation")}</Typography>
                    <Stack direction="row">
                      <Typography sx={{ mr: 2 }}>X</Typography>
                      <Slider
                        value={contentUpdateState?.rotationX ? contentUpdateState?.rotationX : 0}
                        id="rotationX"
                        name="rotationX"
                        onChange={handleChangeStateValue}
                        step={1}
                        min={0}
                        max={360}
                        valueLabelDisplay="auto"
                      />
                    </Stack>
                    <Stack direction="row">
                      <Typography sx={{ mr: 2 }}>Y</Typography>
                      <Slider
                        value={contentUpdateState?.rotationY ? contentUpdateState?.rotationY : 0}
                        id="rotationY"
                        name="rotationY"
                        onChange={handleChangeStateValue}
                        step={1}
                        min={0}
                        max={360}
                        valueLabelDisplay="auto"
                      />
                    </Stack>
                    <Stack direction="row">
                      <Typography sx={{ mr: 2 }}>Z</Typography>
                      <Slider
                        value={contentUpdateState?.rotationZ ? contentUpdateState?.rotationZ : 0}
                        id="rotationZ"
                        name="rotationZ"
                        onChange={handleChangeStateValue}
                        step={1}
                        min={0}
                        max={360}
                        valueLabelDisplay="auto"
                      />
                    </Stack>
                  </Box>
                </Grid>
              )}
              {/* ลิงก์ไปยัง sketchfab */}
              <Grid item xs={12} sx={{ p: 1 }}>
                <Typography>
                  {t("content_diglog_create_edit.title_p4")}{" "}
                  <Link href="https://sketchfab.com" target="_blank">
                    sketchfab.com
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>

          {/* ส่วนของปุ่มส่ง */}
          <DialogActions sx={{ padding: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={
                onProgressStatus ||
                (contentUpdateState?.media?.type === "embedded" && mediaFile?.length === 0
                  ? !contentMediaState?.mediaName
                  : false)
              }
              endIcon={<Publish />}
              sx={{ fontWeight: 700 }}
            >
              {onProgressStatus ? <CircularProgress size={24} color="inherit" /> : <>{buttonText}</>}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DialogMessage open={openDialog} onClose={handleCloseDialog} message={dialogMessage} />
      <DialogMessage open={openDialogSoundLimit} onClose={handleCloseDialogSoundLimit} message={dialogMessage} />
    </>
  );
};
ContentDialogEdit.defaultProps = {
  status: false,
  onCloseDialog: () => {},
  refetch: () => {},
  setProjectState: () => {},
  contentUpdateState: {
    contentId: "",
    name: "",
    scale: 0.0,
    rotationX: 0.0,
    rotationY: 0.0,
    rotationZ: 0.0,
    still: false,
    media: {},
    markerId: "",
    markerName: "",
    markerUrl: "",
  },
  setContentUpdateState: () => {},
  handleOpenPreviewMedia: () => {},
};
ContentDialogEdit.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
  setProjectState: PropTypes.func,
  contentUpdateState: PropTypes.shape({
    contentId: PropTypes.string,
    name: PropTypes.string,
    scale: PropTypes.number,
    rotationX: PropTypes.number,
    rotationY: PropTypes.number,
    rotationZ: PropTypes.number,
    still: PropTypes.bool,
    media: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      mediaUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
    markerId: PropTypes.string,
    markerName: PropTypes.string,
    markerUrl: PropTypes.string,
  }),
  setContentUpdateState: PropTypes.func,
  handleOpenPreviewMedia: PropTypes.func,
};

export default ContentDialogEdit;
