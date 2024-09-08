import { useQuery } from "@apollo/client";
import { NavigateNext, ContentCopy, QrCodeScanner, ArrowBack, Videocam, Link } from "@mui/icons-material";
import { Breadcrumbs, Container, Grid, IconButton, InputAdornment, Button, Tooltip } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import ContentList from "../component/manage-project-page/content-list";
import PDFDownloadComponent from "../component/manage-project-page/downloadPdf";
import PreviewMarker from "../component/manage-project-page/preview-marker";
import PreviewMedia from "../component/manage-project-page/preview-media";
import PreviewQR from "../component/manage-project-page/preview-qr";
import { SkeletonManageProjectPage } from "../component/manage-project-page/skeleton-manage-project-page";
import { NimitrTextField } from "../component/ui/text-field";
import AuthContext from "../contexts/AuthContext";
import contentbyUser from "../graphql/queries/contentbyUser";
import projectbyId from "../graphql/queries/projectbyId";
import userinfo from "../graphql/queries/userinfo";

const initialPreviewMarkerState = {
  markerName: "",
  markerUrl: "",
  status: false,
};

const initialPreviewMediaState = {
  mediaName: "",
  mediaUrl: "",
  status: false,
};

const URL_MARKERS = process.env.REACT_APP_GET_MARKER;

export const ManageProjectPage = () => {
  const BACKEND = process.env.REACT_APP_DOMAIN;
  const { user } = useContext(AuthContext);
  const [projectUrl, setProjectUrl] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const [previewQrCodeStatus, setPreviewQrCodeStatus] = useState(false);
  const [markerData, setMarkerData] = useState([]);

  const [previewMarkerStatus, setPreviewMarkerStatus] = useState(initialPreviewMarkerState);
  const [previewMediaStatus, setPreviewMediaStatus] = useState(initialPreviewMediaState);

  const { data: projectData } = useQuery(projectbyId, {
    variables: {
      id: params?.projectId,
    },
    fetchPolicy: "cache-and-network",
  });

  const [quser, setQuser] = useState(null);
  const { data } = useQuery(userinfo, {
    fetchPolicy: "network-only",
    variables: {
      id: user && user._id ? user._id : "default_id",
    },
  });

  useEffect(() => {
    if (data && data.userId && data.userId.rank) {
      setQuser(data.userId);
    }
  }, [data]);

  const {
    data: contentData,
    loading,
    refetch,
  } = useQuery(contentbyUser, {
    variables: {
      filter: {
        project: params?.projectId,
        OR: [
          { contentStatus: "CONTENT_ALIVE" },
          { contentStatus: "CONTENT_MAXIMUM" },
          { contentStatus: "CONTENT_LOCK" },
        ],
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const { t } = useTranslation();

  const fetchMarkers = useCallback(() => {
    axios
      .post(URL_MARKERS, {
        projectId: `${params?.projectId}`,
      })
      .then((res) => {
        setMarkerData(res.data);
      });
  }, [params?.projectId]);

  useEffect(() => {
    fetchMarkers();
  }, [fetchMarkers]);

  const handleTogglePreviewQr = () => {
    setPreviewQrCodeStatus(!previewQrCodeStatus);
  };

  const handleOpenPreviewMedia = (url, name, type, scale, rotation) => {
    setPreviewMediaStatus({
      ...previewMediaStatus,
      mediaName: name,
      mediaUrl: url,
      mediaType: type,
      status: true,
      scale: scale,
      rotation: rotation,
    });
  };

  const handleClosePreviewMedia = () => {
    setPreviewMediaStatus(initialPreviewMediaState);
  };

  const handleOpenPreviewMarker = (url, name) => {
    setPreviewMarkerStatus({
      ...previewMarkerStatus,
      markerName: name,
      markerUrl: url,
      status: true,
    });
  };

  const handleClosePreviewMarker = () => {
    setPreviewMarkerStatus(initialPreviewMarkerState);
  };

  const handleCopyText = (url) => {
    navigator.clipboard.writeText(url);
  };

  const handleRefetchContent = () => {
    fetchMarkers();
    refetch({
      project: params?.projectId,
      statusmarker: "MARKER_ALIVE",
      statuscontent: "CONTENT_ALIVE",
    });
  };

  useEffect(() => {
    if (projectData?.projectId?.type === "image") {
      const updatedUrl = `${BACKEND}/api/v1/render/${projectData?.projectId?._id}/mindar`;
      setProjectUrl(updatedUrl);
    } else {
      const updatedUrl = `${BACKEND}/api/v1/render/${projectData?.projectId?._id}`;
      setProjectUrl(updatedUrl);
    }
  }, [BACKEND, projectData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading ? (
        <SkeletonManageProjectPage />
      ) : (
        <>
          <Grid container direction="row" justifyContent="space-between" alignContent="center">
            <Grid
              item
              xs={12}
              sx={{
                mb: 3,
                display: "flex",
                alignSelf: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                sx={{ fontWeight: 700 }}
                onClick={() => {
                  navigate("/project");
                }}
              >
                <ArrowBack />
                {t("manage-project-page.title_back")}
              </Button>
              <PDFDownloadComponent />
            </Grid>
            <NimitrTextField
              type="url"
              name="url"
              id="url"
              sx={{ width: "100%", mb: 2 }}
              value={
                projectData?.projectId?.type === "image"
                  ? `${BACKEND}/api/v1/render/${projectData?.projectId?._id}/mindar`
                  : `${BACKEND}/api/v1/render/${projectData?.projectId?._id}`
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link to="/">Link Text</Link>
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <Tooltip title={t("manage-project-page.title_copy")}>
                        <IconButton
                          onClick={handleCopyText(
                            projectData?.projectId?.type === "image"
                              ? `${BACKEND}/api/v1/render/${projectData?.projectId?._id}/mindar`
                              : `${BACKEND}/api/v1/render/${projectData?.projectId?._id}`
                          )}
                        >
                          <ContentCopy />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                    <InputAdornment position="end">
                      <Tooltip title={t("manage-project-page.title_qr")}>
                        <IconButton onClick={handleTogglePreviewQr}>
                          <QrCodeScanner />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                    <InputAdornment position="end">
                      <Tooltip title={t("manage-project-page.title_camera")}>
                        <IconButton
                          as="a"
                          target="_blank"
                          href={
                            projectData?.projectId?.type === "image"
                              ? `${BACKEND}/api/v1/render/${projectData?.projectId?._id}/mindar`
                              : `${BACKEND}/api/v1/render/${projectData?.projectId?._id}`
                          }
                        >
                          <Videocam />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  </>
                ),
              }}
            />

            <Breadcrumbs
              separator={<NavigateNext fontSize="small" />}
              aria-label="breadcrumb"
              sx={{ alignSelf: "center" }}
            />
          </Grid>
          <ContentList
            content={contentData?.contents}
            markerData={markerData}
            refetch={handleRefetchContent}
            handleOpenPreviewMedia={handleOpenPreviewMedia}
            handleOpenPreviewMarker={handleOpenPreviewMarker}
            projectId={params?.projectId}
            quser={quser}
          />
          {previewMarkerStatus?.status && (
            <PreviewMarker
              url={previewMarkerStatus?.markerUrl}
              name={previewMarkerStatus?.markerName}
              onClosePreviewMarkerDialog={handleClosePreviewMarker}
              status={previewMarkerStatus?.status}
            />
          )}
          {previewMediaStatus?.status && (
            <PreviewMedia
              url={previewMediaStatus?.mediaUrl}
              name={previewMediaStatus?.mediaName}
              type={previewMediaStatus?.mediaType}
              onClosePreviewMediaDialog={handleClosePreviewMedia}
              status={previewMediaStatus?.status}
              scale={previewMediaStatus?.scale}
              rotation={previewMediaStatus?.rotation}
            />
          )}
          {previewQrCodeStatus && (
            <PreviewQR onClosePreviewQrDialog={handleTogglePreviewQr} url={projectUrl} status={previewQrCodeStatus} />
          )}
        </>
      )}
    </Container>
  );
};
