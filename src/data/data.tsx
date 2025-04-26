import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, Circle, CircleOff, HelpCircle, Timer } from "lucide-react";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statusPihak = [
  {
    value: "penggugat",
    label: "Penggugat",
  },
  {
    value: "tergugat",
    label: "Tergugat",
  },

  {
    value: "pemohon",
    label: "Pemohon",
  },
  {
    value: "termohon",
    label: "Termohon",
  },
];
export const statusAlamat = [
  {
    value: "diketahui",
    label: "Diketahui Alamatnya",
  },
  {
    value: "tidak_diketahui",
    label: "Tidak Diketahui Alamatnya",
  },
];

export const statusPendaftaran = [
  {
    value: "Perkara Terdaftar",
    label: "Perkara Terdaftar",
  },
  {
    value: "Perkara Belum Terdaftar",
    label: "Perkara Belum Terdaftar",
  },
];
export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];
