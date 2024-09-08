import { useMutation, useQuery } from "@apollo/client";
import { DeleteOutline, Add, ModeEditOutline, GetApp, SwipeLeft, SwipeRight, AddAPhoto } from "@mui/icons-material";
import axios from "axios";
import {
  Box,
  Grid,
  Stack,
  Chip,
  IconButton,
  Paper,
  Button,
  useTheme,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import RemoveContentMutation from "../../graphql/mutations/removeContent";
import RemoveMarkerMutation from "../../graphql/mutations/removeMarker";
import projectbyId from "../../graphql/queries/projectbyId";
import CompilerComponent from "../marker-control-page/CompilerComponent";

import ContentDialogCreate from "./content-dialog-create";
import ContentDialogEdit from "./content-dialog-edit";
import ContentDialogPreview from "./content-dialog-preview";

import CustomBackdrop from "../ui/BackdropProgress";

const initialMarkerState = {
  markerId: "",
  markerName: "",
  markerUrl: "",
};

const initialContentState = {
  contentId: "",
  name: "",
  scale: "",
  rotationX: "",
  rotationY: "",
  rotationZ: "",
  media: "",
  markerId: "",
  markerName: "",
  markerUrl: "",
  still: false,
};

const ContentList = ({
  content: contentData,
  markerData,
  refetch,
  handleOpenPreviewMarker,
  handleOpenPreviewMedia,
  projectId,
  quser,
}) => {
  console.log("🚀 ~ markerData:", markerData)
  const { data: projectData } = useQuery(projectbyId, {
    fetchPolicy: "network-only",
    variables: {
      id: projectId,
    },
  });
  const theme = useTheme();
  const { t } = useTranslation();
  const BACKEND = process.env.REACT_APP_DOMAIN;
  const [removeContentMutation] = useMutation(RemoveContentMutation);
  const [dialogCreateContentStatus, setDialogCreateContentStatus] = useState(false);
  const [dialogPreviewContentStatus, setDialogPreviewContentStatus] = useState(false);
  const [dialogCreateMarkerStatus, setDialogCreateMarkerStatus] = useState(false);
  const [removeMarkerMutation] = useMutation(RemoveMarkerMutation);
  const [url, setUrl] = useState("");

  const [dialogOpenmidar, setdialogOpenmidar] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingContent, setDeletingContent] = useState(false);
  const [deletingMarker, setDeletingMarker] = useState(false);

  const [dialogEditContentStatus, setDialogEditContentStatus] = useState(false);

  const [markerSelect, setMarkerSelect] = useState(initialMarkerState);

  const [contentUpdateState, setContentUpdateState] = useState(initialContentState);

  const recommendFileVideo = () => {
    return (
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          color: "red",
          textAlign: "center",
          px: 2,
        }}
      >
        {t("content_list.title_p15")}
      </Typography>
    );
  };
  const recommendFileModel = () => {
    return (
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          color: "red",
          textAlign: "center",
          px: 2,
        }}
      >
        {t("content_list.title_p16")}
      </Typography>
    );
  };

  useEffect(() => {
    if (projectData?.projectId?.type === "image") {
      const updatedUrl = `${BACKEND}/api/v1/render/${projectData?.projectId?._id}/mindar`;
      setUrl(updatedUrl);
    } else {
      const updatedUrl = `${BACKEND}/api/v1/render/${projectData?.projectId?._id}`;
      setUrl(updatedUrl);
    }
  }, [BACKEND, projectData]);

  if (!markerData || !contentData) {
    return null;
  }

  const arr = markerData?.map((marker) => {
    const matchingContent = contentData?.find((o) => o?.marker?._id === marker?._id);

    if (matchingContent) {
      return _.assign({}, marker, matchingContent);
    }

    return marker;
  });

  const handleOpenCreateDialog = (marker) => {
    setMarkerSelect({
      ...markerSelect,
      markerId: marker?._id,
      markerName: marker?.name,
      markerUrl: marker?.markerUrl,
    });
    setDialogCreateContentStatus(true);
  };

  const handleCloseCreateDialog = () => {
    setDialogCreateContentStatus(false);
  };

  const handleOpenPreviewDialog = async (marker, content) => {
    setMarkerSelect({
      ...markerSelect,
      markerId: marker?._id,
      markerName: marker?.name,
      markerUrl: marker?.markerUrl,
    });
    setContentUpdateState({
      ...contentUpdateState,
      contentId: content?._id,
      contentName: content?.name,
      scale: parseFloat(content?.scale),
      rotationX: content?.rotationX,
      rotationY: content?.rotationY,
      rotationZ: content?.rotationZ,
      media: content?.media,
      markerId: content?.marker?._id,
      markerName: content?.marker?.name,
      markerUrl: content?.marker?.markerUrl,
    });
    setDialogPreviewContentStatus(true);
  };

  const handleClosePreviewDialog = () => {
    setDialogPreviewContentStatus(false);
  };

  const handleOpenMarkerCreateDialog = () => {
    setDialogCreateMarkerStatus(true);
  };

  const handleCloseMarkerCreateDialog = () => {
    setDialogCreateMarkerStatus(false);
  };

  const handleOpenEditDialog = async (content) => {
    await setContentUpdateState({
      ...contentUpdateState,
      contentId: content?._id,
      name: content?.name,
      scale: content?.scale,
      rotationX: content?.rotationX,
      rotationY: content?.rotationY,
      rotationZ: content?.rotationZ,
      still: content?.media?.still,
      media: content?.media,
      markerId: content?.marker?._id,
      markerName: content?.marker?.name,
      markerUrl: content?.marker?.markerUrl,
    });
    setDialogEditContentStatus(true);
  };

  const handleCloseEditDialog = () => {
    setDialogEditContentStatus(false);
  };

  const handleRemoveContent = async (ContentId, contentData, quser) => {
    console.log("🚀 ~ handleRemoveContent ~ quser:", quser);
    console.log("🚀 ~ handleRemoveContent ~ contentData:", contentData);
    try {
      setDeletingContent(true);
      const { data: responseRemoveContent } = await removeContentMutation({
        variables: {
          _id: ContentId,
          status: "CONTENT_DELETE",
        },
      });
      if (responseRemoveContent) {
        const mediaUrl = contentData;
        console.log("🚀 ~ handleRemoveContent ~ mediaUrl:", mediaUrl);
        if (mediaUrl) {
          // Assuming mediaUrl contains both id and filename
          const url = new URL(mediaUrl);
          const id = quser;
          console.log("🚀 ~ handleRemoveContent ~ id:", id);

          // Assuming the filename is the last part of the path
          const pathSegments = url.pathname.split("/");
          const filename = pathSegments[pathSegments.length - 1];
          console.log("🚀 ~ handleRemoveContent ~ filename:", filename);

          if (id && filename) {
            // Step 3: Send a DELETE request to the server to delete the media file
            await axios.delete("http://localhost:8000/deletemedia", {
              data: {
                id,
                filename,
              },
            });
            console.log("Media file deleted successfully");
          }
        }
        refetch();
        handleCloseRemoveDialog();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingContent(false);
    }
  };

  const handleRemovemidarMarker = async (MarkerId) => {
    try {
      setDeletingMarker(true);
      const { data: responseRemoveMarker } = await removeMarkerMutation({
        variables: {
          _id: MarkerId,
          status: "MARKER_DELETE",
        },
      });

      if (responseRemoveMarker) {
        refetch();
        handleCloseRemovemidarDialog();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingMarker(false);
    }
  };

  const handleOpenRemoveDialog = (rowId) => {
    setDialogOpen((prev) => ({ ...prev, [rowId]: true }));
  };

  const handleCloseRemoveDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenRemovemidarDialog = (rowId) => {
    setdialogOpenmidar((prev) => ({ ...prev, [rowId]: true }));
  };

  const handleCloseRemovemidarDialog = () => {
    setdialogOpenmidar(false);
  };

  const columns = [
    { field: "index", headerName: "#", width: 50 },
    {
      field: "name",
      headerName: t("content_list.title_headerName1"),
      width: 280,
    },
    {
      field: "marker",
      headerName: t("content_list.title_headerName2"),
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title={t("content_list.title_p1")}>
          <Button onClick={() => handleOpenPreviewMarker(params.value, params.row.name)}>
            <Box
              component="img"
              src={params.value}
              sx={{
                width: "50px",
                height: "50px",
                p: 1,
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "5px",
              }}
            />
          </Button>
        </Tooltip>
      ),
    },
    {
      field: "media",
      headerName: t("content_list.title_headerName3"),
      width: 400,
      renderCell: (params) => (
        <Box align="center">
          {params.value[1] ? (
            <Tooltip title={t("content_list.title_p2")}>
              <Button
                onClick={() => {
                  handleOpenPreviewMedia(
                    params.value[0],
                    params.value[1],
                    params.value[2],
                    params.value[3],
                    params.value[4]
                  );
                }}
              >
                {params.value[1]}
              </Button>
            </Tooltip>
          ) : null}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: t("content_list.title_headerName4"),
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Tooltip title={t("content_list.title_headerName4")} align="center" sx={{ fontWeight: 700 }}>
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Chip
              label={
                params.value[0] === "CONTENT_LOCK"
                  ? "LOCKED"
                  : params.value[0] === "CONTENT_ALIVE"
                  ? params.value[1] > 10000
                    ? t("content_list.title_label1")
                    : [params.value[2], "/", params.value[1]]
                  : params.value[0] === "CONTENT_MAXIMUM"
                  ? "เต็ม"
                  : params.value[3] === "MARKER_ALIVE"
                  ? t("content_list.title_label2")
                  : params.value[3] === "MARKER_LOCK"
                  ? "LOCKED"
                  : t("content_list.title_label2")
              }
              color={
                params.value[0] === "CONTENT_LOCK"
                  ? "error"
                  : params.value[0] === "CONTENT_ALIVE"
                  ? "success"
                  : params.value[0] === "CONTENT_MAXIMUM"
                  ? "warning"
                  : params.value[3] === "MARKER_ALIVE"
                  ? "success" // Set a color for 'MARKER_ALIVE' if desired
                  : params.value[3] === "MARKER_LOCK"
                  ? "error" // Set a color for 'MARKER_LOCK' if desired
                  : "primary"
              }
              sx={{ width: "100px" }}
            />
          </Stack>
        </Tooltip>
      ),
    },
    // {
    //   field: 'still',
    //   headerName: t('content_list.title_p12'),
    //   width: 120,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params) => (
    //     <Typography variant='text'>
    //       {params.value ? t('content_list.title_p14') : t('content_list.title_p13')}
    //     </Typography>
    //   )
    // },
    {
      field: "manager",
      headerName: t("content_list.title_headerName5"),
      width: 200,
      renderCell: (params) => (
        <Box
          align="center"
          sx={{
            "&.MuiTableRow-root": {
              my: 2,
            },
          }}
        >
          <Grid item xs={12} lg={4}>
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              {params.value[0] ? (
                <>
                  <Tooltip title={t("content_list.title_p3")}>
                    <IconButton
                      sx={{
                        backgroundColor: theme.palette.primary.lightGray,
                        boxShadow: 5,
                        mr: 1,
                      }}
                      onClick={() => {
                        handleOpenPreviewDialog(params.value[1], params.value[2]);
                      }}
                      disabled={params.value[0] === "CONTENT_LOCK"}
                    >
                      <GetApp />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("content_list.title_p4")}>
                    <IconButton
                      sx={{
                        backgroundColor: theme.palette.primary.lightGray,
                        boxShadow: 5,
                        mr: 1,
                      }}
                      onClick={() => {
                        handleOpenEditDialog(params.value[2]);
                      }}
                      disabled={params.value[0] === "CONTENT_LOCK"}
                    >
                      <ModeEditOutline />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("content_list.title_p5")}>
                    <IconButton
                      sx={{
                        backgroundColor: "red",
                        boxShadow: 5,
                        mr: 1,
                        color: theme.palette.primary.white,
                      }}
                      onClick={() => handleOpenRemoveDialog(params.value[3])}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Tooltip>

                  <Dialog
                    open={dialogOpen[params.value[3]] !== undefined && dialogOpen[params.value[3]]}
                    onClose={() => handleCloseRemoveDialog(params.value[3])}
                  >
                    <DialogTitle>{t("content_list.title_p5")}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>{t("content_list.title_dialog_sure")}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleCloseRemoveDialog(params.value[3])}>
                        {t("content_list.title_cancel")}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleRemoveContent(params.value[3], params.value[4], params.value[6]);
                          handleCloseRemoveDialog(params.value[3]);
                        }}
                        sx={{ background: "red", color: "white" }}
                      >
                        {t("content_list.title_p5")}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <>
                  <Tooltip title={t("content_list.title_p7")}>
                    <IconButton
                      sx={{
                        backgroundColor: theme.palette.primary.lightGray,
                        boxShadow: 5,
                        mr: 1,
                      }}
                      onClick={() => {
                        handleOpenCreateDialog(params.value[1]);
                      }}
                      disabled={contentData.length >= quser?.maxcontents || params.value[5] === "MARKER_LOCK"}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>

                  {params.row.markerType === "mindar" && (
                    <>
                      {/* <Tooltip title={t('content_list.title_p4')}>
                        <IconButton
                          sx={{
                            backgroundColor: theme.palette.primary.lightGray,
                            boxShadow: 5,
                            mr: 1
                          }}
                          onClick={() => {
                            handleOpenEditDialog(params.value[2])
                          }}
                        >
                          <ModeEditOutline />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title={t("content_list.title_marker_list_p5")}>
                        <IconButton
                          sx={{
                            backgroundColor: "red",
                            boxShadow: 5,
                            mr: 1,
                            color: theme.palette.primary.white,
                          }}
                          onClick={() => {
                            handleOpenRemovemidarDialog(params.value[3]);
                          }}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}

                  <Dialog
                    open={dialogOpenmidar[params.value[3]]}
                    onClose={() => handleCloseRemovemidarDialog(params.value[3])}
                  >
                    <DialogTitle>{t("content_list.title_marker_list_p5")}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>{t("content_list.title_dialog_sure")}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleCloseRemovemidarDialog(params.value[3])}>
                        {t("content_list.title_cancel")}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleRemovemidarMarker(params.value[3]);
                          handleCloseRemovemidarDialog(params.value[3]);
                        }}
                        sx={{ background: "red", color: "white" }}
                        autoFocus
                      >
                        {t("content_list.title_marker_list_p5")}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
            </Stack>
          </Grid>
        </Box>
      ),
    },
  ];
  let currentIndex = 0;

  const filteredRows = markerData
    ?.map((marker, index) => {
      const projectType = projectData?.projectId?.type;
      const markerType = marker?.markerType;
      if (projectType === "image" || projectType === "barcode") {
        if (
          (projectType === "image" && markerType === "mindar") ||
          (projectType === "barcode" && markerType !== "mindar")
        ) {
          currentIndex += 1;
          return {
            id: marker?._id,
            marker: marker?.markerUrl,
            name: marker?.name,
            markerType: marker?.markerType,
            media: [
              arr[index]?.media?.mediaUrl,
              arr[index]?.media?.name,
              arr[index]?.media?.type,
              arr[index]?.scale,
              [arr[index]?.rotationX, arr[index]?.rotationY, arr[index]?.rotationZ],
            ],
            status: [arr[index]?.contentStatus, quser?.maxperuse, arr[index]?.nowuse, marker?.markerStatus],
            still: arr[index]?.media?.still,
            manager: [
              arr[index]?.contentStatus,
              marker,
              arr[index],
              arr[index]?._id,
              arr[index]?.media?.mediaUrl,
              marker?.markerStatus,
              quser?._id,
            ],
            index: currentIndex, // Set the index for this group
          };
        }
      }

      // Return a default value if conditions are not met
      return null;
    })
    .filter(Boolean);

  // filteredRows.sort((a, b) => {
  //   const orderMap = {
  //     CONTENT_ALIVE: 1,
  //     CONTENT_MAXIMUM: 2,
  //     CONTENT_LOCK: 3,
  //     MARKER_ALIVE: 4,
  //     MARKER_LOCK: 5,
  //   };

  //   const orderA = orderMap[a.status[0]] || 0;
  //   const orderB = orderMap[b.status[0]] || 0;

  //   if (a.status[0] === "CONTENT_LOCK" && b.status[0] === "MARKER_LOCK") {
  //     return -1; // ให้ 'CONTENT_LOCK' ขึ้นก่อน 'MARKER_LOCK'
  //   }
  //   if (a.status[0] === "MARKER_LOCK" && b.status[0] === "CONTENT_LOCK") {
  //     return 1; // ให้ 'MARKER_LOCK' ขึ้นหลัง 'CONTENT_LOCK'
  //   }

  //   if (a.status[0] === "CONTENT_ALIVE" && b.status[0] !== "CONTENT_ALIVE") {
  //     return -1; // ให้ 'CONTENT_ALIVE' ขึ้นก่อนทุกค่าที่ไม่ใช่ 'CONTENT_ALIVE'
  //   }
  //   if (a.status[0] !== "CONTENT_ALIVE" && b.status[0] === "CONTENT_ALIVE") {
  //     return 1; // ให้ 'CONTENT_ALIVE' ขึ้นหลังทุกค่าที่ไม่ใช่ 'CONTENT_ALIVE'
  //   }

  //   // เพิ่มเงื่อนไขใหม่ที่นี่
  //   if (a.status[0] === "CONTENT_MAXIMUM" && b.status[0] === "MARKER_LOCK") {
  //     return -1; // ให้ 'CONTENT_MAXIMUM' ขึ้นก่อน 'MARKER_LOCK'
  //   }
  //   if (a.status[0] === "MARKER_LOCK" && b.status[0] === "CONTENT_MAXIMUM") {
  //     return 1; // ให้ 'MARKER_LOCK' ขึ้นหลังจาก 'CONTENT_MAXIMUM'
  //   }

  //   return orderA - orderB;
  // });

  // const disabledButtonCompomiler = quser && filteredRows && filteredRows.length >= quser?.maxmarkers;

  return (
    <Box component={Paper} sx={{ mt: 2, boxShadow: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
          p: 1,
        }}
      >
        <SwipeLeft />
        <Typography
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.black,
            fontSize: { xs: "13px", sm: "16px" },
            textAlign: "center",
          }}
        >
          {t("content_list.title_p8")}
        </Typography>
        <SwipeRight />
      </Box>
      {projectData?.projectId?.type === "image" ? (
        <>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Tooltip title={t("content_list.title_button_addImageMarker")} arrow>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 0.5,
                }}
                onClick={handleOpenMarkerCreateDialog}
                disabled={disabledButtonCompomiler}
                startIcon={<AddAPhoto />}
              >
                <Typography sx={{ fontWeight: 700 }}>{t("content_list.title_button_addImageMarker")}</Typography>
              </Button>
            </Tooltip>
          </Box>
          <CompilerComponent
            status={dialogCreateMarkerStatus}
            onCloseDialog={handleCloseMarkerCreateDialog}
            refetch={refetch}
            projectId={projectId}
            quser={quser}
          />
        </>
      ) : null}

      {filteredRows && filteredRows.length > 0 ? (
        <DataGrid
          rows={filteredRows}
          columns={columns}
          sx={{
            "& .MuiTableCell-head": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      ) : (
        <Typography variant="h6" fontWeight={700} textAlign={"center"} color={theme.palette.primary.black}>
          {t("content_list.title_PleaseAddMarker")}
        </Typography>
      )}

      {dialogPreviewContentStatus && contentData ? (
        <ContentDialogPreview
          status={dialogPreviewContentStatus}
          open={dialogPreviewContentStatus}
          onCloseDialog={handleClosePreviewDialog}
          refetch={refetch}
          qr={url}
          marker={markerSelect}
          content={contentUpdateState}
        />
      ) : null}

      <ContentDialogCreate
        recommendFileModel={recommendFileModel}
        recommendFileVideo={recommendFileVideo}
        quser={quser}
        status={dialogCreateContentStatus}
        onCloseDialog={handleCloseCreateDialog}
        refetch={refetch}
        projectId={projectId}
        markerSelect={markerSelect}
      />
      <ContentDialogEdit
        recommendFileModel={recommendFileModel}
        recommendFileVideo={recommendFileVideo}
        quser={quser}
        status={dialogEditContentStatus}
        onCloseDialog={handleCloseEditDialog}
        refetch={refetch}
        content={contentUpdateState}
        contentUpdateState={{
          ...contentUpdateState,
          scale: parseFloat(contentUpdateState.scale),
          rotationX: parseFloat(contentUpdateState.rotationX),
          rotationY: parseFloat(contentUpdateState.rotationY),
          rotationZ: parseFloat(contentUpdateState.rotationZ),
          still: contentUpdateState?.still || false,
          media: {
            ...(contentUpdateState.media || ""),
            _id: contentUpdateState.media?._id || "",
            mediaUrl: contentUpdateState.media?.mediaUrl || "",
            name: contentUpdateState.media?.name || "",
            type: contentUpdateState.media?.type || "",
          },
          markerId: contentUpdateState.markerId,
          markerName: contentUpdateState.markerName,
          markerUrl: contentUpdateState.markerUrl,
        }}
        setContentUpdateState={setContentUpdateState}
        handleOpenPreviewMedia={handleOpenPreviewMedia}
      />
      {!markerData?.length && (
        <Paper
          elevation={3}
          sx={{
            mt: 0,
            bgcolor: theme?.palette?.primary?.main,
            color: "white",
            width: "100%",
            height: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" fontWeight={700} textAlign={"center"} color={theme.palette.primary.black}>
            {t("content_list.title_emptry_marker")}
          </Typography>
        </Paper>
      )}
      <CustomBackdrop open={deletingContent || deletingMarker} />
    </Box>
  );
};

ContentList.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      scale: PropTypes.number,
      rotationX: PropTypes.number,
      rotationY: PropTypes.number,
      rotationZ: PropTypes.number,
      still: PropTypes.bool,
      media: PropTypes.shape,
      markerId: PropTypes.string,
      markerName: PropTypes.string,
      markerUrl: PropTypes.string,
    })
  ).isRequired,
  markerData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      markerType: PropTypes.string,
      markerUrl: PropTypes.string,
    })
  ).isRequired,
  refetch: PropTypes.func.isRequired,
  handleOpenPreviewMarker: PropTypes.func.isRequired,
  handleOpenPreviewMedia: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default ContentList;
