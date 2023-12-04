import { useState } from "react";

export function useModal() {

  const [openDropdownOptions, setOpenDropdownOptions] = useState({
    id: null,
    open: false
  });

  const [openDropdownContact, setOpenDropdownContact] = useState({
    id: null,
    open: false
  });

  const [openSingleModal, setOpenSingleModal] = useState({
    reference: null,
    open: false,
    data: null
  });

  const [mode, setMode] = useState("view");

  function handleEdit() {
    setMode("edit");
  };

  function handleBlock() {
    setMode("view");
  };

  function handleToggleModal(reference = null, data = null, open = null) {
    setOpenSingleModal({
      reference,
      open: open ? open : !openSingleModal.open,
      data
    })
  }

  function resetAllModals() {

    setOpenDropdownOptions({
      id: null,
      open: false
    });

    setOpenDropdownContact({
      id: null,
      open: false
    });

    setOpenSingleModal({
      reference: null,
      open: false,
      data: null
    });

  }

  function handleDropdownOptions(id) {
    setOpenDropdownOptions({
      id,
      open: !openDropdownOptions.open
    })
  }

  function handleDropdownContact(id) {
    setOpenDropdownContact({
      id,
      open: !openDropdownContact.open
    })
  }

  return {
    openDropdownOptions,
    handleDropdownOptions,
    openDropdownContact,
    handleDropdownContact,
    resetAllModals,
    handleToggleModal,
    openSingleModal,
    mode,
    handleEdit,
    handleBlock
  }
}
