"use client";

import type { COD } from "@/lib/types";
import { formatDate, formatTons } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface CODPreviewProps {
  cod: COD;
}

export default function CODPreview({ cod }: CODPreviewProps) {
  return (
    <div className="bg-stone-50 border-2 border-slate-300 rounded-lg overflow-hidden">
      {/* Document header */}
      <div className="bg-slate-800 px-5 py-3 flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
          Certificate of Destruction
        </h3>
        <StatusBadge status={cod.status} />
      </div>

      {/* COD number and date */}
      <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
        <span className="text-sm font-bold font-mono-data text-slate-900">
          {cod.cod_number}
        </span>
        <span className="text-xs text-slate-500 font-mono-data">
          {formatDate(cod.date_issued)}
        </span>
      </div>

      {/* Fields grid */}
      <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Facility
          </p>
          <p className="text-sm text-slate-800">{cod.facility_name}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Customer
          </p>
          <p className="text-sm text-slate-800">{cod.customer_name}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Material
          </p>
          <p className="text-sm text-slate-800">{cod.material_type}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Tons Destroyed
          </p>
          <p className="text-sm font-bold text-slate-800 font-mono-data">
            {formatTons(cod.tons_destroyed)}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Method
          </p>
          <p className="text-sm text-slate-800">{cod.destruction_method}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
            Regulatory Ref
          </p>
          <p className="text-sm text-slate-800 font-mono-data">
            {cod.regulatory_reference}
          </p>
        </div>
      </div>

      {/* Signature */}
      <div className="px-5 py-4 border-t border-slate-200">
        <div className="flex items-end gap-3">
          <p className="text-xs text-slate-500 shrink-0">Certified by:</p>
          <div className="flex-1 border-b border-slate-300 pb-0.5">
            <p className="text-sm font-medium text-slate-800 italic">
              {cod.signed_by || "Pending signature"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
