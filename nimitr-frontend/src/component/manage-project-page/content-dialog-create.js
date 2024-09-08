import { useMutation } from "@apollo/client";
import axios from "axios";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { Close, Publish } from "@mui/icons-material";
import {
  Button,
  Grid,
  Box,
  Link,
  Slider,
  Stack,
  useTheme,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  InputAdornment,
  Divider,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import CreateContentMutation from "../../graphql/mutations/createContent";
import CreateMediaMutation from "../../graphql/mutations/createMedia";
import { LinearProgressWithLabel } from "../progress";
import { NimitrTextField } from "../ui/text-field";

import SoundCheckbox from "./SoundCheckbox";
import CustomBackdrop from "../ui/BackdropProgress";
import StillCheckbox from "./StillCheckbox";

import DialogMessage from "./dialog-Alert-fileSize";

import "../ui/dropZone.css";
import SwitchButtonFileDropzone from "./SwitchButtonFileDropzone";

const initialContentState = {
  name: "",
  scale: 0.1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  still: false,
};

const initialContentMediaState = {
  mediaName: "",
  mediaType: "",
  mediaUrl: "",
  soundURL: "",
};
const ContentDialogCreate = ({
  recommendFileModel,
  recommendFileVideo,
  status,
  quser,
  onCloseDialog,
  refetch,
  projectId,
  markerSelect,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  // Azure Part
  const [fileSelected, setFileSelected] = useState();
  const [, setFileUploaded] = useState("");

  const [uploading, setUploading] = useState(false);
  const buttonText = uploading
    ? t("content_diglog_create_edit.title_uploading")
    : t("content_diglog_create_edit.title_submit");

  const [, setInputKey] = useState(Math.random().toString(36));

  const [contentState, setContentState] = useState(initialContentState);

  const [progress, setProgress] = useState(0);
  const [contentMediaState, setContentMediaState] = useState(initialContentMediaState);
  const [createContentMutation] = useMutation(CreateContentMutation);
  const [createMediaMutation] = useMutation(CreateMediaMutation);

  const [mediaFile, setMediaFile] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedStill, setIsCheckedStill] = useState(false);
  const [soundFile, setSoundFile] = useState([]);
  const [soundSelected, setSoundSelected] = useState();

  const uploadMediaUrl = process.env.REACT_APP_UPLOAD_MEDIA;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleCheckboxStillChange = (e) => {
    setContentState({ ...contentState, still: e.target.checked });
    setIsCheckedStill(e.target.checked);
  };

  const updatesoundfile = (newSoundFile) => {
    if (newSoundFile.length !== 0) {
      const selectedFile = newSoundFile[0].file;

      const maxSizeInMB = quser?.maxsizeaudio;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (selectedFile.size > maxSizeInBytes) {
        setSoundFile([]);
        setDialogMessage(`${t("content_list.title_p11")} ${maxSizeInMB} MB`);
        setOpenDialog(true);
      } else {
        setSoundFile(newSoundFile);
        setSoundSelected(selectedFile);
      }
    }
  };

  const onDeleteMediaFile = (id) => {
    setMediaFile(mediaFile.filter((x) => x.id !== id));
  };

  const onDeleteSoundFile = (id) => {
    setSoundFile(soundFile.filter((x) => x.id !== id));
  };

  const handleChangeStateValue = (e) => {
    setContentState({ ...contentState, [e.target.name]: e.target.value });
  };

  const handleEmbeddedValue = (e) => {
    setContentMediaState({
      ...contentMediaState,
      [e.target.name]: e.target.value,
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const handleCloseDialog = () => {
    setOpenDialog(false);
    // setMediaFile([])
  };

  const uploadMedia = async (file, type) => {
    try {
      const base64 = await fileToBase64(file);
      const fileExtension = file.name.split(".").pop();
      const response = await axios.post(uploadMediaUrl, {
        id: quser?._id,
        media: base64,
        type: fileExtension,
      });

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

  const handleSubmitCreateContent = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // const typeContainer = contentMediaState?.mediaType || "modal";
      const typeContainerEmbedded = contentMediaState?.mediaType === "embedded";

      // Upload the media and sound files
      const mediaUrl = await uploadMedia(fileSelected);
      const soundUrl = await uploadMedia(soundSelected, "audio");
      const embeddedVideoUrl = await uploadMedia(fileSelected, "video");

      const iframeVideoUrl = `
        <video style="width: 80%; height: auto; max-width: 100%; max-height: 60%;" controls>
        <source src="${embeddedVideoUrl}" type="video/mp4">
        </video>`;

      if (mediaUrl) {
        const { data: responseCreateContent } = await createContentMutation({
          variables: {
            project: projectId,
            name: contentState?.name,
            scale: contentState?.scale,
            rotationX: contentState?.rotationX,
            rotationY: contentState?.rotationY,
            rotationZ: contentState?.rotationZ,
            marker: markerSelect?.markerId,
          },
        });

        if (responseCreateContent) {
          const { data: responseMediaContent } = await createMediaMutation({
            variables: {
              project: projectId,
              content: responseCreateContent?.createContent?.recordId,
              name: fileSelected?.name,
              type: contentMediaState?.mediaType || "modal",
              mediaUrl,
              soundURL: soundUrl,
              still: contentState?.still,
            },
          });

          if (responseMediaContent) {
            setFileSelected(null);
            setFileUploaded(fileSelected.name);
            setUploading(false);
            setInputKey(Math.random().toString(36));
          }
        }
      } else if (typeContainerEmbedded) {
        const { data: responseCreateContent } = await createContentMutation({
          variables: {
            project: projectId,
            name: contentState?.name,
            marker: markerSelect?.markerId,
          },
        });

        if (responseCreateContent) {
          const { data: responseMediaContent } = await createMediaMutation({
            variables: {
              project: projectId,
              content: responseCreateContent?.createContent?.recordId,
              name: embeddedVideoUrl ? fileSelected?.name : contentMediaState?.mediaName,
              type: contentMediaState?.mediaType,
              mediaUrl: embeddedVideoUrl ? iframeVideoUrl : contentMediaState?.mediaUrl,
              still: true,
            },
          });

          if (responseMediaContent) {
            setFileSelected(null);
            setFileUploaded(fileSelected.name);
            setUploading(false);
            setInputKey(Math.random().toString(36));
          }
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error(error);
    }
    handleRefresh();
  };

  const updateMediaFile = (incomingFiles) => {
    if (incomingFiles.length === 0) {
      // No files were selected
      setMediaFile(incomingFiles);
      return;
    }

    let allowedExtensions = [];

    if (contentMediaState.mediaType === "modal") {
      allowedExtensions = [".glb"];
    } else if (contentMediaState.mediaType === "video") {
      allowedExtensions = [".mp4", ".mov"];
    } else if (contentMediaState.mediaType === "embedded") {
      allowedExtensions = [".mp4"];
    }

    const maxSizeInMB =
      contentMediaState.mediaType === "modal"
        ? quser?.maxsizemodel
        : contentMediaState.mediaType === "video"
        ? quser?.maxsizevideo
        : contentMediaState.mediaType === "embedded"
        ? quser?.maxsizevideo
        : 0;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const file = incomingFiles[0].file;

    const fileExtension = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();

    if (file.size > maxSizeInBytes) {
      setMediaFile([]);
      setDialogMessage(`${t("content_list.title_p11")} ${maxSizeInMB} MB`);
      setOpenDialog(true);
    } else if (!allowedExtensions.includes(fileExtension)) {
      setDialogMessage(t("content_list.title_p23"));
      setMediaFile([]);
      setOpenDialog(true);
    } else {
      setMediaFile(incomingFiles);
      setFileSelected(file);
    }
  };

  const handleRefresh = () => {
    onDeleteMediaFile();
    setMediaFile([]);
    setContentState(initialContentState);
    setContentMediaState(initialContentMediaState);
    setProgress(0);
    refetch();
    onCloseDialog();
  };

  const CreateFileSizeWarning = () => {
    if (contentMediaState.mediaType === "modal") {
      if (mediaFile.length === 0) {
        return (
          <>
            {/* <Typography
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: "red",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              {t("content_list.title_p11")} {quser?.maxsizemodel}MB
            </Typography> */}
            {recommendFileModel()}
          </>
        );
      }
    } else if (contentMediaState.mediaType === "video" || "embedded") {
      if (mediaFile.length === 0) {
        const maxsizevideoMB = quser?.maxsizevideo;
        const maxsizevideoGB = maxsizevideoMB < 1024 ? maxsizevideoMB + "MB" : maxsizevideoMB / 1024 + "GB";

        return (
          <>
            {/* <Typography
              sx={{
                fontWeight: 700,
                fontSize: "12px",
                color: "red",
                textAlign: "center",
              }}
              style={{ marginBottom: "8px" }}
            >
              {t("content_list.title_p11")} {maxsizevideoGB}
            </Typography> */}
            {recommendFileVideo()}
          </>
        );
      }
    }
    return null;
  };

  return (
    <>
      <Dialog open={status} keepMounted maxWidth="md">
        <CustomBackdrop open={uploading} />

        <Box component="form" onSubmit={handleSubmitCreateContent}>
          {/* ส่วนหัวของ Dialog */}
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {t("content_diglog_create_edit.title_head1")}
            </Typography>
            <IconButton onClick={onCloseDialog}>
              <Close />
            </IconButton>
          </DialogTitle>

          {/* ส่วนเนื้อหาของ Dialog */}
          <DialogContent>
            {/*เส้นแบ่งหัวและเนื้อหา */}
            <Grid item xs={12} lg={12} sx={{ mb: 2 }}>
              <Divider />
            </Grid>
            {/* ส่วนแบ่งคอนเทนเนอร์ */}
            <Grid container spacing={3}>
              {/* คอลัมน์ซ้าย */}
              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  <Typography fontWeight={700}>{t("content_diglog_create_edit.title_head2")}</Typography>
                  {/* แสดงช่องข้อมูล */}
                  <NimitrTextField
                    margin="normal"
                    required
                    id="name"
                    name="name"
                    placeholder={t("content_diglog_create_edit.title_p1")}
                    value={contentState?.name}
                    onChange={handleChangeStateValue}
                    sx={{
                      width: "100%",
                      mt: { lg: 6, xs: 4 },
                    }}
                  />
                  {/* แสดงรูปภาพ */}
                  <Box
                    component="img"
                    src={markerSelect?.markerUrl}
                    sx={{
                      width: "100%",
                      height: "auto",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "10px",
                    }}
                  />
                  <Typography sx={{ textAlign: "center" }}>{markerSelect?.markerName}</Typography>
                </Stack>
              </Grid>

              {/* คอลัมน์ขวา */}
              <Grid item xs={12} lg={6}>
                <Stack spacing={2}>
                  {/* เลือกประเภท */}
                  <TextField
                    id="outlined-select-currency"
                    select
                    label={t("content_diglog_create_edit.title_label")}
                    size="small"
                    onChange={(e) => {
                      setContentMediaState({
                        ...contentMediaState,
                        mediaType: e.target.value,
                      });
                    }}
                    value={contentMediaState?.mediaType ? contentMediaState?.mediaType : ""}
                    helperText={t("content_diglog_create_edit.title_p2")}
                  >
                    <MenuItem value="modal">{t("content_diglog_create_edit.title_menuitem1")}</MenuItem>
                    <MenuItem value="video">{t("content_diglog_create_edit.title_menuitem2")}</MenuItem>
                    <MenuItem value="embedded">{t("content_list.title_p17")}</MenuItem>
                  </TextField>

                  {/* แสดงอัปโหลดไฟล์ */}
                  {contentMediaState.mediaType === "modal" && (
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
                        {/* แสดง Typography เฉพาะเมื่อไม่มีไฟล์เข้าใน Dropzone */}
                        {CreateFileSizeWarning()}
                        {/* เลือกไฟล์ */}
                        {mediaFile.map((file) => (
                          <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                        ))}
                      </Dropzone>

                      {/* เช็คบ็อกซ์สำหรับเสียงและการหยุดนิ่งของ Model */}
                      {mediaFile.length > 0 && (
                        <Box>
                          <SoundCheckbox
                            t={t}
                            quser={quser}
                            isChecked={isChecked}
                            handleCheckboxChange={handleCheckboxChange}
                            updatesoundfile={updatesoundfile}
                            onDeleteSoundFile={onDeleteSoundFile}
                            soundFile={soundFile}
                          />
                        </Box>
                      )}
                    </>
                  )}

                  {/* Dropzone สำหรับวิดีโอ */}
                  {contentMediaState.mediaType === "video" && (
                    <>
                      <Dropzone
                        onChange={updateMediaFile}
                        value={mediaFile}
                        width="100%"
                        required
                        accept=".mp4,.mov"
                        height="auto"
                        maxFiles="1"
                        disableScroll
                        view="grid"
                      >
                        {/* แสดง Typography เฉพาะเมื่อไม่มีไฟล์เข้าใน Dropzone */}
                        {CreateFileSizeWarning()}
                        {mediaFile.map((file) => (
                          <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                        ))}
                      </Dropzone>
                    </>
                  )}
                  {/* embedded */}
                  {contentMediaState.mediaType === "embedded" && (
                    <>
                      <SwitchButtonFileDropzone
                        t={t}
                        SwitchButtonFileDropzone={contentState?.still}
                        handleSwitchFileDropzoneChange={handleCheckboxStillChange}
                      />
                      {contentState?.still ? (
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
                          {CreateFileSizeWarning()}
                          {mediaFile.map((file) => (
                            <FileItem {...file} key={file.id} onDelete={onDeleteMediaFile} preview />
                          ))}
                        </Dropzone>
                      ) : (
                        <>
                          <Typography sx={{ fontWeight: 700 }}>{t("marker_dialog_create_edit.title_p3")}</Typography>
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
                            multiline
                            variant="filled"
                            sx={{
                              width: "100%",
                            }}
                          />
                        </>
                      )}
                    </>
                  )}

                  {/* แสดงความคืบหน้า */}
                  {!progress ? null : <LinearProgressWithLabel value={progress} />}

                  {/* ชื่อข้อมูลสื่อ */}
                  {mediaFile?.length !== 0 && progress === 100 && (
                    <NimitrTextField
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
                        width: "100%",
                        mt: 1,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            {t("content_diglog_create_edit.title_inputadornment")}
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}

                  {/* ลิงก์ไปยัง sketchfab.com */}
                  {contentMediaState.mediaType === "embedded" ? null : (
                    <>
                      <Box>
                        <StillCheckbox
                          t={t}
                          isCheckedStill={contentState?.still}
                          handleCheckboxStillChange={handleCheckboxStillChange}
                        />
                        <Typography fontWeight={700}>{t("content_diglog_create_edit.title_scale")}</Typography>
                        <Slider
                          disabled={mediaFile?.length === 0 && progress !== 100}
                          value={contentState?.scale}
                          id="scale"
                          name="scale"
                          onChange={handleChangeStateValue}
                          step={0.1}
                          min={0.1}
                          max={3}
                          valueLabelDisplay="auto"
                        />

                        <Typography fontWeight={700}>{t("content_diglog_create_edit.title_rotation")}</Typography>
                        <Stack direction="row">
                          <Typography sx={{ mr: 2 }}>X </Typography>
                          <Slider
                            disabled={mediaFile?.length === 0 && progress !== 100}
                            value={contentState?.rotationX}
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
                            disabled={mediaFile?.length === 0 && progress !== 100}
                            value={contentState?.rotationY}
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
                            disabled={mediaFile?.length === 0 && progress !== 100}
                            value={contentState?.rotationZ}
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
                      <Typography>
                        {t("content_diglog_create_edit.title_p4")}
                        <Link href="https://sketchfab.com" target="_blank">
                          sketchfab.com
                        </Link>
                      </Typography>
                    </>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>

          {/* ส่วนของปุ่มส่ง */}
          <DialogActions sx={{ padding: 2 }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<Publish />}
              sx={{ fontWeight: 700 }}
              disabled={(!mediaFile?.length && !contentMediaState?.mediaUrl && !fileSelected?.name) || uploading}
            >
              {uploading ? <CircularProgress size={24} color="inherit" /> : <>{buttonText}</>}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <DialogMessage open={openDialog} onClose={handleCloseDialog} message={dialogMessage} />
    </>
  );
};
ContentDialogCreate.defaultProps = {
  status: false,
  onCloseDialog: () => {},
  refetch: () => {},
  setProjectState: null,
  projectState: null,
  markerSelect: null,
  projectId: "",
};
ContentDialogCreate.propTypes = {
  status: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  refetch: PropTypes.func,
  setProjectState: PropTypes.func,
  projectState: PropTypes.shape(),
  markerSelect: PropTypes.shape(),
  projectId: PropTypes.string,
};
export default ContentDialogCreate;
